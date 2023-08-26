/**
 * HTML Document Object
 *     HTML の要素を表すクラス
 */
class HDO {
	/**
	 * @type {string}
	 */
	tagName;
	/**
	 * @type {string[]}
	 */
	classes;
	/**
	 * @type {Object.<string, (string | number)>}
	 */
	styles;
	/**
	 * @type {(string | HDO)[]}
	 */
	contents;
	/**
	 * @type {{string: (string | boolean)}}
	 */
	attributes;

	/**
	 * 
	 * @param {{tagName: string, classes: string[], styles: string, contents: (string | HDO)[], attributes: {string: (string | boolean)}}} 
	 */
	constructor({tagName = "div", classes = [], styles = "", contents = [], attributes = []}) {
		this.tagName = tagName;
		this.classes = classes;
		this.styles = styles;
		this.contents = contents;
		this.attributes = attributes;
	}

	/**
	 * オブジェクトの内容から HTML 要素を生成
	 * @returns {HTMLElement}
	 */
	generateElement() {
		const elem = document.createElement(this.tagName);
		
		this.classes.forEach((c) => {
			if (c) {
				elem.classList.add(c);
			}
		});

		Object.keys(this.styles).forEach((key) => {
			elem.style[key] = this.styles[key];
		});

		this.contents.forEach((content) => {
			if (content.constructor.name === "HDO") {
				elem.appendChild(content.generateElement());
			}
			else {
				elem.innerHTML += content;
			}
		});

		Object.keys(this.attributes).forEach((key) => {
			if (typeof (this.attributes[key]) === "boolean") {
				elem.setAttribute(key, "");
			}
			else {
				elem.setAttribute(key, this.attributes[key]);
			}
		});

		return elem;
	}
}