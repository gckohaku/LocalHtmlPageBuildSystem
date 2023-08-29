window.onload = () => {
	
let count = 0;
document.querySelector("#button-number").textContent = 0;
const increment = () => {
	count++;
	let docNum = parseInt(document.querySelector("#button-number").textContent);
	docNum += count;
	document.querySelector("#button-number").textContent = docNum;
	console.log(count);
}
document.querySelector(".button").addEventListener("click", increment);
	}
