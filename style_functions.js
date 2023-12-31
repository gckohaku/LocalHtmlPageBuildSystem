/**
 * セレクタが複数指定されているものかどうか
 * @param {string} selector 
 * @returns {boolean}
 */
const checkMultipleSelector = (selector) => {
	let depth = 0;

	for (const c of selector) {
		if (c === "(") {
			depth++;
			continue;
		}
		if (c === ")") {
			depth--;
		}
		if (c === "," && depth === 0) {
			return true;
		}
	}

	return false;
}

/**
 * スタイルの文字列をまとめた配列を生成
 *     dockingArray に対する副作用あり
 * @param {string} selector 
 * @param {Object.<string, (string | number | Object.<string, any>)>} obj 
 * @param {Array.<string>} dockingArray 
 * @param {number} insertIndex 
 */
const generateStyle = (selector, obj, dockingArray, insertIndex) => {
	dockingArray.push("");

	let res = selector + " {\n";

	for (const ckey in obj) {
		let key = ckey;

		console.log(typeof (obj[ckey]));
		if (typeof (obj[ckey]) === "object") {
			const innerArray = [];
			dockingArray.push(innerArray);

			if (checkMultipleSelector(key)) {
				key = ":is(" + key + ")";
			}

			if (key.includes("&")) {
				generateStyle(key.replaceAll("&", selector), obj[ckey], innerArray, innerArray.length);
			}
			else {
				generateStyle(selector + " " + key, obj[ckey], innerArray, innerArray.length);
			}
		}
		else {
			res += `\t${convertCamelToKebab(key)}: ${obj[ckey]};\n`;
		}
	}

	res += "}";

	dockingArray[insertIndex] = res;
}

/**
 * スタイルの文字列がまとめられている配列から textContent にセットする文字列に変換
 * @param {Array<string>} styleArray 
 * @param {{string: string}} contentStr 
 */
const makeStyleContent = (styles, contentStr) => {
	let ret = "";
	for (const style of styles) {
		if (typeof (style) === "object") {
			ret += makeStyleContent(style, contentStr);
		}
		else {
			console.log(style);
			ret += style + "\n\n";
		}
	}

	return ret;
}