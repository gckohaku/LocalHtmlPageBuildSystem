/**
 * キャメルケースの文字列をケバブケースに変換
 * @param {string} camelString 
 * @returns {string} 
 */
const convertCamelToKebab = (camelString) => {
	return camelString.split(/(?=[A-Z])/).join("-").toLowerCase();
}