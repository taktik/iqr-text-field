import {css} from "lit-element";

// language=CSS
export const iqrTextFieldStyle = css`
:host {
	--bg-color-1: #F44336;
}
.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror pre {
  white-space: pre-wrap;
}

.ProseMirror li {
  position: relative;
}

.ProseMirror-hideselection *::selection { background: transparent; }
.ProseMirror-hideselection *::-moz-selection { background: transparent; }
.ProseMirror-hideselection { caret-color: transparent; }

.ProseMirror-selectednode {
  outline: 2px solid #8cf;
}

/* Make sure li selections wrap around markers */

li.ProseMirror-selectednode {
  outline: none;
}

li.ProseMirror-selectednode:after {
  content: "";
  position: absolute;
  left: -32px;
  right: -2px; top: -2px; bottom: -2px;
  border: 2px solid #8cf;
  pointer-events: none;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}
/* Add space around the hr to make clicking it easier */

.ProseMirror-example-setup-style hr {
  padding: 2px 10px;
  border: none;
  margin: 1em 0;
}

.ProseMirror-example-setup-style hr:after {
  content: "";
  display: block;
  height: 1px;
  background: silver;
  line-height: 2px;
}

.ProseMirror ul, .ProseMirror ol {
  padding-left: 30px;
}

.ProseMirror blockquote {
  padding-left: 1em;
  border-left: 3px solid #eee;
  margin-left: 0; margin-right: 0;
}

.ProseMirror-example-setup-style img {
  cursor: default;
}

.ProseMirror-prompt {
  background: white;
  padding: 5px 10px 5px 15px;
  border: 1px solid silver;
  position: fixed;
  border-radius: 3px;
  z-index: 11;
  box-shadow: -.5px 2px 5px rgba(0, 0, 0, .2);
}

.ProseMirror-prompt h5 {
  margin: 0;
  font-weight: normal;
  font-size: 100%;
  color: #444;
}

.ProseMirror-prompt input[type="text"],
.ProseMirror-prompt textarea {
  background: #eee;
  border: none;
  outline: none;
}

.ProseMirror-prompt input[type="text"] {
  padding: 0 4px;
}

.ProseMirror-prompt-close {
  position: absolute;
  left: 2px; top: 1px;
  color: #666;
  border: none; background: transparent; padding: 0;
}

.ProseMirror-prompt-close:after {
  content: "✕";
  font-size: 12px;
}

.ProseMirror-invalid {
  background: #ffc;
  border: 1px solid #cc7;
  border-radius: 4px;
  padding: 5px 10px;
  position: absolute;
  min-width: 10em;
}

.ProseMirror-prompt-buttons {
  margin-top: 5px;
  display: none;
}
#editor, .editor {
  color: black;
  background-clip: padding-box;
  border-radius: 4px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  padding: 5px 0;
}

.ProseMirror p:first-child,
.ProseMirror h1:first-child,
.ProseMirror h2:first-child,
.ProseMirror h3:first-child,
.ProseMirror h4:first-child,
.ProseMirror h5:first-child,
.ProseMirror h6:first-child {
  margin-top: 3px;
}

.ProseMirror p:last-child,
.ProseMirror h1:last-child,
.ProseMirror h2:last-child,
.ProseMirror h3:last-child,
.ProseMirror h4:last-child,
.ProseMirror h5:last-child,
.ProseMirror h6:last-child {
  margin-bottom: 3px;
}


.ProseMirror {
  padding: 2px 8px 2px 8px;
  line-height: 1.2;
  outline: none;
}

.ProseMirror p { margin-bottom: 1em }

.iqr-form {
  background: #EDF2F7;
  border-radius: 8px;
  border: none;
  min-height: 28px;
  height: auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: space-between;
}

#editor {
  background: transparent;
  border: none;
  padding: 0;
	flex-grow: 1;
}

#content {
  position: relative;
  padding: 0;
}


* {
  font-family: 'Inter', Arial, sans-serif;
}

p {
  color: #274768;
  font-size: 14px;
  font-weight: 400;
  margin-top: 0;
}

h3 {
  color: #274768;
  margin-top: 0;
}

.extra {
	flex-shrink: 0;
  height: 28px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0 8px;
  transition: all .24s cubic-bezier(.42,.01,1,.62);
}

.extra > .info {
  color: #809AB4;
  font-size: 12px;
  width: 100%;
  height: auto;
  overflow: hidden;
  pointer-events: none;
  text-align: right;
}

.extra > .info > span {
  font-weight: 700;
}

.extra .buttons-container {
  display: flex;
  height: 100%;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  width: 0;
  transition: all .24s cubic-bezier(.14,.69,.87,.54);
}

.extra:hover .buttons-container .menu-container .btn {
  animation: slideIn .24s ease-in forwards;
  pointer-events: none;
}

.extra:hover .buttons-container .menu-container .btn {
  animation-delay: 0.24s;
}

.extra:hover .buttons-container .menu-container:hover .btn {
  animation-delay: 0.04s;
}

.extra.forced:hover .buttons-container .menu-container .btn {
  animation: none;
  pointer-events: all;
}

.extra.forced  .buttons-container .btn {
	opacity: 1 !important;
}

.extra.forced .info {
	opacity: 0 !important;
}

.extra:hover .info {
  opacity: 0;
  z-index: 0;
}

.extra .buttons-container .btn {
  border: none;
  background: transparent;
  position: relative;
  top: 0;
  opacity: 0;
  cursor: pointer;
  height: 20px;
  width: 10px;
  margin-left: 4px;
  margin-right: 4px;
}

.extra .buttons-container .btn svg path{
  fill: #809AB4;
}

.extra .buttons-container .btn:hover svg path {
  fill: #274768;
}

.extra .buttons-container .menu-container .btn:hover::after {
  content: attr(data-content);
  position: absolute;
  top: -22px;
  height: 16px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  background: #274768;
  color: white;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  text-transform: capitalize;
  white-space: nowrap;
  padding: 0 12px;
  font-size: 12px;
  line-height: 0;
}

.extra .buttons-container .btn:focus, .extra .buttons-container .btn:focus-within{
  border: none;
  outline: none;
}

.extra .buttons-container .menu-container .btn:hover::before {
  content: '';
  display: block;
  border-color: #274768 transparent transparent transparent;
  border-style: solid;
  border-width: 4px;
  position: absolute;
  top: -6px;
}

@keyframes slideIn{
	0% {
	top: 12px;
    pointer-events: none;
  }
  100% {
    top: 0;
    opacity: 1;
    pointer-events: all;
  }
}

.menu-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
}

.menu {
  display: block;
  position: absolute;
  top: 20px;
  right: 0;
  z-index: 2;
  background: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 8px;
}

.menu .input-container {
  background: #EDF2F7;
  border-radius: 4px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  height: 32px;
  margin-bottom: 4px;
  padding: 0 4px;
}

.menu .input-container:hover {
  box-shadow: 0 0 0 3px rgba(40, 151, 255, 0.2);
}

.menu .input-container:focus-within {
  box-shadow: 0 0 0 3px rgba(40, 151, 255, 0.2),
              0 0 0 1px rgba(40, 151, 255, 1);
}

.menu .input-container input{
  background: transparent;
  border: none;
  flex-grow: 1;
  height: 100%;
}

.menu .input-container input:focus{
  background: transparent;
  border: none;
  outline: none;
}

.menu-trigger:focus .menu{
  display: block;
}

.menu-container .item {
  height: 22px;
  width: 100%;
  background: transparent;
  border-radius: 4px;
  font-size: 14px;
  color: #274768;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  box-shadow: none;
  border: none;
}

.menu-container .item:hover {
  background: #F5F9FD;
  font-weight: 500;
  border-radius: 4px;
}

span {
	position: relative;
	z-index: 1;
}

span:hover::after {
	position: absolute;
	content: attr(data-content);
	background: #274768;
	color: #FFFFFF;
	font-size: 9px;
	top: -10px;
	left: 0px;
	padding: 0px 2px;
}
span::before {
	position:absolute;
	content: '';
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	opacity: .3;
}

.masked {
	display: none;
}

.companion {
    position: absolute;
    width: 15px;
		background-color: hsla(194,100%,50%,1);
    color: white;
    z-index: 20;
    padding: 0;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 0 2px 2px 0;
}

.companion:hover {
	font-weight: 700;
	background: hsla(202,100%,50%,1);
}

*::selection {
	background-color: hsla(194,100%,50%,.2);
}

.suggestion-palette {
	position: absolute;
	z-index: 20;
	max-width: 380px;
	font-size: 11px;
	overflow: hidden;
	text-overflow: ellipsis;
	padding: 4px;
	border: none;
	border-radius: 8px;
	background: white;
	box-shadow:
			0 1.1px 1.1px rgba(0, 0, 0, 0.022),
			0 2.7px 2.7px rgba(0, 0, 0, 0.032),
			0 5px 5px rgba(0, 0, 0, 0.04),
			0 8.9px 8.9px rgba(0, 0, 0, 0.048),
			0 16.7px 16.7px rgba(0, 0, 0, 0.058),
			0 40px 40px rgba(0, 0, 0, 0.08)
	;
}

.suggestion-palette ul {
	white-space: nowrap;
	list-style-type: none;
	margin: 0;
	padding: 0;
}
.suggestion-palette ul li{
	padding: 0 8px;
	font-size: 11px;
	height: 20px;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 4px;
	color: rgb(39, 71, 104);
}

.suggestion-palette ul li svg {
	height: 12px;
	width: 12px;
	border-radius: 4px;
	transform-origin: center center;
}
.suggestion-palette ul li svg path {
	fill: rgb(128, 154, 180);
}

.suggestion-palette ul li:not(:first-child) svg.tab-icn, .suggestion-palette ul li:not(.focused) svg.return-icn, .suggestion-palette ul.focused li:first-child svg.tab-icn {
	height: 0;
	width: 0;
	transform: scale(0);
	opacity: 0;
}

.suggestion-palette ul li.focused {
	background-color: rgb(237, 242, 247);
}

.suggestion-palette ul li.focused svg.return-icn{
	animation: growIn .24s ease-in forwards;
}

@keyframes growIn{
	0% {
		transform: scale(0.5)
	}
	90% {
		transform: scale(1.1)
	}
	100% {
		transform: scale(1)
	}
}

span.code-count-1::after, span.code-count-1::before {
	background: var(--bg-code-color-1);
	color: var(--text-code-color-1);
}
span.code-count-2::after, span.code-count-2::before {
	background: var(--bg-code-color-1);
	color: var(--text-code-color-1);
	/* STRIPES */
	/*background: repeating-linear-gradient(*/
	/*	45deg,*/
	/*	var(--bg-code-color-1),*/
	/*	var(--bg-code-color-1) 10px,*/
	/*	var(--bg-code-color-2) 10px,*/
	/*	var(--bg-code-color-2) 20px*/
	/*);*/
	
	/* PAS STRIPES */
	background: linear-gradient(90deg, var(--bg-code-color-1) 0%, var(--bg-code-color-2) 100%);
}

span.code-count-3::after, span.code-count-3::before {
	background: var(--bg-code-color-1);
	color: var(--text-code-color-1);
	/* STRIPES */
	background: repeating-linear-gradient(
		45deg,
		var(--bg-code-color-1),
		var(--bg-code-color-1) 10px,
		var(--bg-code-color-2) 10px,
		var(--bg-code-color-2) 20px
	);

	/* PAS STRIPES */
	/* background: linear-gradient(90deg, var(--bg-code-color-1) 0%, var(--bg-code-color-2) 100%);*/
}

 `
