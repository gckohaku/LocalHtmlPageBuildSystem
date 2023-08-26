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

	Object.keys(obj).forEach((key) => {
		console.log(typeof (obj[key]));
		if (typeof (obj[key]) === "object") {
			const innerArray = [];
			dockingArray.push(innerArray);
			if (key[0] === "&") {
				generateStyle(selecto + key.substring(1, key.length), obj[key], innerArray, innerArray.length);
			}
			else {
				generateStyle(selector + " " + key, obj[key], innerArray, innerArray.length);
			}
		}
		else {
			res += `\t${convertCamelToKebab(key)}: ${obj[key]};\n`;
		}
	});

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
	styles.forEach((style) => {
		if (typeof (style) === "object") {
			ret += makeStyleContent(style, contentStr);
		}
		else {
			console.log(style);
			ret += style + "\n\n";
		}
	});

	return ret;
}