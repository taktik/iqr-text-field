import { Schema } from 'prosemirror-model';

export const colors: { [key: string]: [string, string] } = {
	'I': ['#F44336', 'white'],
	'II': ['#E91E63', 'white'],
	'III': ['#9C27B0', 'white'],
	'IV': ['#673AB7', 'white'],
	'V': ['#009688', 'white'],
	'VI': ['#4CAF50', 'white'],
	'VII': ['#8BC34A', 'white'],
	'VIII': ['#03A9F4', 'white'],
	'IX': ['#00BCD4', 'white'],
	'X': ['#FFC107', 'black'],
	'XI': ['#FF9800', 'black'],
	'XII': ['#FF5722', 'white'],
	'XIII': ['#795548', 'white'],
	'XIV': ['#3949AB', 'white'],
	'XV': ['#C0CA33', 'black'],
	'XVI': ['#07F87F', 'black'],
	'XVII': ['#FF6262', 'white'],
	'XVIII': ['#718792', 'white'],
	'XIX': ['#00ECB9', 'black'],
	'XX': ['#FF20A3', 'black'],
	'XXI': ['#FFCE38', 'black'],
	'XXII': ['#721F01', 'white']
}

const getColor = (c:string) => colors[c] || [c, 'white']

export function schema(colorProvider: (type:string, code:string, isCode: boolean) => string, contentProvider: (codes: {type: string, code: string}[]) => string) {
	return new Schema({
		nodes: {
			doc: {
				content: 'block+'
			},

			paragraph: {
				content: 'inline*',
				group: 'block',
				parseDOM: [{tag: 'p'}],
				toDOM() {
					return ['p', 0]
				}
			},

			blockquote: {
				content: 'block+',
				group: 'block',
				parseDOM: [{tag: 'blockquote'}],
				toDOM() {
					return ['blockquote', 0]
				}
			},

			horizontal_rule: {
				group: 'block',
				parseDOM: [{tag: 'hr'}],
				toDOM() {
					return ['div', ['hr']]
				}
			},

			heading: {
				attrs: {level: {default: 1}},
				content: '(text | image)*',
				group: 'block',
				defining: true,
				parseDOM: [{tag: 'h1', attrs: {level: 1}},
					{tag: 'h2', attrs: {level: 2}},
					{tag: 'h3', attrs: {level: 3}},
					{tag: 'h4', attrs: {level: 4}},
					{tag: 'h5', attrs: {level: 5}},
					{tag: 'h6', attrs: {level: 6}}],
				toDOM(node) {
					return ['h' + node.attrs.level, 0]
				}
			},

			ordered_list: {
				content: 'list_item+',
				group: 'block',
				attrs: {order: {default: 1}, tight: {default: false}},
				parseDOM: [{
					tag: 'ol', getAttrs(dom) {
						const el = dom as Element
						return {
							order: el.hasAttribute('start') ? +(el.getAttribute('start') || 0) : 1,
							tight: el.hasAttribute('data-tight')
						}
					}
				}],
				toDOM(node) {
					return ['ol', {
						start: node.attrs.order === 1 ? null : node.attrs.order,
						'data-tight': node.attrs.tight ? 'true' : null
					}, 0]
				}
			},

			bullet_list: {
				content: 'list_item+',
				group: 'block',
				attrs: {tight: {default: false}},
				parseDOM: [{tag: 'ul', getAttrs: dom => ({tight: (dom as Element).hasAttribute('data-tight')})}],
				toDOM(node) {
					return ['ul', {'data-tight': node.attrs.tight ? 'true' : null}, 0]
				}
			},

			list_item: {
				content: 'paragraph block*',
				defining: true,
				parseDOM: [{tag: 'li'}],
				toDOM() {
					return ['li', 0]
				}
			},

			text: {
				group: 'inline'
			},

			image: {
				inline: true,
				attrs: {
					src: {},
					alt: {default: null},
					title: {default: null}
				},
				group: 'inline',
				draggable: true,
				parseDOM: [{
					tag: 'img[src]', getAttrs(dom) {
						const el = dom as Element
						return {
							src: el.getAttribute('src'),
							title: el.getAttribute('title'),
							alt: el.getAttribute('alt')
						}
					}
				}],
				toDOM(node) {
					return ['img', node.attrs]
				}
			},

			hard_break: {
				inline: true,
				group: 'inline',
				selectable: false,
				parseDOM: [{tag: 'br'}],
				toDOM() {
					return ['br']
				}
			}
		},

		marks: {
			em: {
				parseDOM: [{tag: 'i'}, {tag: 'em'},
					{style: 'font-style', getAttrs: value => value === 'italic' && null}],
				toDOM() {
					return ['em']
				}
			},

			strong: {
				parseDOM: [{tag: 'b'}, {tag: 'strong'},
					{style: 'font-weight', getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value as string) && null}],
				toDOM() {
					return ['strong']
				}
			},

			link: {
				attrs: {
					href: {},
					title: {default: null}
				},
				inclusive: false,
				parseDOM: [{
					tag: 'span[data-href]', getAttrs(dom) {
						const el = dom as HTMLElement
						return {href: el.dataset.href, title: el.dataset.title}
					}
				}],
				toDOM(node) {
					const urls: string = node.attrs.href
					if (urls) {
						const refs = urls.split(',').map(url => {
							let pos = url.indexOf('://');
							const protocol = url.substring(0, pos)
							const code = url.substring(pos + 3)
							let parts = protocol.split('-');
							const category = parts[0]
							const type = parts[1]

							return {category, type, code}
						})

						const codes = refs.filter(x => x.category === 'c')
						const ilinks = refs.filter(x => x.category === 'i')

						const classes = (refs.some(x => x.category === 'x') ? ['ext-link'] : []).concat(codes.length ? [ `code-count-${codes.length}` ] : [])

						const dataAttributes = (codes.length ? [{'data-content':contentProvider(codes)} as any] : [])
							.concat(ilinks.map((c,idx) => ({ [`data-link-color-${idx}`]: colorProvider(c.type, c.code, false) })))

						const styles = 	codes.map((c,idx) => {
							const color = getColor(colorProvider(c.type, c.code, true));
							return (`--bg-code-color-${idx + 1}: ${color[0]}; --text-code-color-${idx + 1}: ${color[1]};`);
						})

						return ['span', dataAttributes.reduce((acc, da) => Object.assign(da, acc), {['data-href']: node.attrs.href, ['data-title']: node.attrs.title, 'class': classes.join(' '), 'style': styles.join('')})]
					}

					return ['span', {['data-href']: node.attrs.href, ['data-title']: node.attrs.title}]
				}
			}
		}
	})
}
