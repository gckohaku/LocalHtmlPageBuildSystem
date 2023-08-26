/**
 * キャメルケースの文字列をケバブケースに変換
 * @param {string} camelString 
 * @returns {string} 
 */
const convertCamelToKebab = (camelString) => {
	return camelString.split(/(?=[A-Z])/).join("-").toLowerCase();
}

/**
 * css ファイル名の配列から、HTML の link タグの文字列を生成
 * @param {string[]} styleFiles 
 * @returns {string}
 */
const generateStyleString = (styleFiles) => {
	let ret = "";

	styleFiles.forEach(fileName => {
		ret += `<link rel="stylesheet" href="${fileName}">`;
	});

	return ret;
}