window.onload = () => {
	
let count = 0;
document.querySelector("#button-number").textContent = 0;
const increment = () => {
	document.querySelector("#button-number").textContent++;
}
document.querySelector(".button").addEventListener("click", increment);
	}
