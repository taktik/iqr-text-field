import {css, html, LitElement} from 'lit-element';
import {getRowsUsingPagination, IccCodeXApi} from '@taktik/icc-api/dist';

import './components/iqr-text-field';
import MiniSearch from 'minisearch'

const icd10 = [
	['I', new RegExp('^[AB][0–9]')],
	['II', new RegExp('^C[0-9]–D[0-4]')],
	['III', new RegExp('^D[5–9]')],
	['IV', new RegExp('^E[0–9]')],
	['V', new RegExp('^F[0–9]')],
	['VI', new RegExp('^G[0–9]')],
	['VII', new RegExp('^H[0–5]')],
	['VIII', new RegExp('^H[6–9]')],
	['IX', new RegExp('^I[0–9]')],
	['X', new RegExp('^J[0–9]')],
	['XI', new RegExp('^K[0–9]')],
	['XII', new RegExp('^L[0–9]')],
	['XIII', new RegExp('^M[0–9]')],
	['XIV', new RegExp('^N[0–9]')],
	['XV', new RegExp('^O[0–9]')],
	['XVI', new RegExp('^P[0–9]')],
	['XVII', new RegExp('^Q[0–9]')],
	['XVIII', new RegExp('^R[0–9]')],
	['XIX', new RegExp('^[ST][0–9]')],
	['XX', new RegExp('^[VY][0–9]')],
	['XXI', new RegExp('^Z[0–9]')],
	['XXII', new RegExp('^U[0–9]')]
]

const icpc2 = {
	'B': 'XX',
	'D': 'XI',
	'F': 'VI',
	'H': 'VII',
	'K': 'IX',
	'L': 'XIII',
	'N': 'VI',
	'P': 'V',
	'R': 'X',
	'S': 'XII',
	'T': 'VI',
	'U': 'XIV',
	'W': 'XV',
	'X': 'XVI',
	'Y': 'XVIII',
	'Z': 'XXI'
}

const stopWords = new Set(['du','au','le','les','un','la','des','sur','de'])

class MyApp extends LitElement {
	private api: IccCodeXApi = new IccCodeXApi("https://kraken.svc.icure.cloud/rest/v1",{ Authorization: 'Basic YWJkZW1vQGljdXJlLmNsb3VkOmtuYWxvdQ=='})

	private miniSearch: MiniSearch = new MiniSearch({
		fields: ['text'], // fields to index for full-text search
		storeFields: ['code', 'text', 'links'], // fields to return with search results
		processTerm: (term, _fieldName) =>
			term.length === 1 || stopWords.has(term) ?
				null : term.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
	})

	static get styles() {
		return css`
			iqr-text-field {
				display: block;
				margin-top:24px;
				margin-bottom:24px;
			}
		`;
	}

	async firstUpdated() {
		const codes = await getRowsUsingPagination<any>((key, docId, limit) => {
			return this.api.findPaginatedCodes('be', 'BE-THESAURUS', undefined, undefined, key, docId || undefined, 10000).then(x => ({
				rows: (x.rows || []).map(x => ({id: x.id, code: x.code, text: x.label?.fr, links:x.links})),
				nextKey: x.nextKeyPair?.startKey && JSON.stringify(x.nextKeyPair?.startKey),
				nextDocId: x.nextKeyPair?.startKeyDocId,
				done: (x.rows || []).length < 10000
			}))
		})
		codes && this.miniSearch.addAll(codes)
	}

	codeColorProvider(type: string, code: string) {
		return type === 'ICD' ? (icd10.find(x => code.match(x[1])) || [])[0] || 'XXII' : icpc2[code.substring(0,1)] || 'XXII'
	}

	suggestionProvider(terms: string[]) {
		let normalisedTerms = terms.map(x => x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
		const res: any[] = []
		if (this.miniSearch) {
			while(normalisedTerms.length && res.length<20) {
				res.push(...this.miniSearch.search(normalisedTerms.join(' '))
					.filter(x => {
						return normalisedTerms.every(t => x.terms.includes(t))
					})
					.map(s => Object.assign(s, {terms}))
					.filter(t => !res.some(x => x.text === t.text)))
				res.length<20 && res.push(...this.miniSearch.search(normalisedTerms.join(' '), {prefix: true})
					.filter(x => normalisedTerms.every(t => x.terms.some(mt => mt.startsWith(t))))
					.map(s => Object.assign(s, {terms})).filter(t => !res.some(x => x.text === t.text)))
				normalisedTerms = normalisedTerms.slice(1)
				terms = terms.slice(1)
			}
		}
		return res
	}

	async linksProvider(sug: { id: string, code: string, text: string, terms: string[], links: string[] }) {
		const links = (await Promise.all((sug.links || []).map(id => this.api.getCode(id)))).map(c => ({id:c.id, code:c.code, text:c.label?.fr, type:c.type}))
			.concat([Object.assign({type: sug.id.split('|')[0]}, sug)])
		return {href: links.map(c => `c-${c.type}://${c.code}`).join(','), title: links.map(c => c.text).join('; ')}
	}

	render() {
        return html`
<h2>Simple text field</h2>
<iqr-text-field style="width: 320px" value="*Hello* **world**" owner="Antoine Duchâteau"></iqr-text-field>
<h2>Text field with codes, internal and external links</h2>
<iqr-text-field .codeColorProvider="${this.codeColorProvider}" .suggestionStopWords="${stopWords}" .linksProvider="${this.linksProvider.bind(this)}" .suggestionProvider="${this.suggestionProvider.bind(this)}" value="[Céphalée de tension](c-ICPC://N01,c-ICD://G05.8,i-he://1234) persistante avec [migraine ophtalmique](c-ICPC://N02) associée. [Grosse fatigue](c-ICPC://K56). A suivi un [protocole de relaxation](x-doc://5678)" owner="M. Mennechet"></iqr-text-field>
`;
    }
}

customElements.define('my-app', MyApp);
