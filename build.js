window.onload = () => {

	const style = document.createElement("style");

	// style ドッキング部分
	const styleArray = [];

	components.forEach((component) => {
		console.log("styles: ", component.styles);
		if (component.styles) {
			Object.keys(component.styles).forEach((key) => {
				const styleObject = component.styles[key];
				generateStyle(`#${component.insertId} ${key}`, styleObject, styleArray, styleArray.length);
			});
		}
	});

	console.log(styleArray);

	style.textContent = makeStyleContent(styleArray);
	document.head.appendChild(style);

	const elementTemplate = document.querySelector(".template");

	// template 部分の処理
	components.forEach((component) => {
		const ctn = elementTemplate.querySelector('#' + component.insertId);
		component.templates.forEach((template) => {
			const elem = template.generateElement();
			ctn.appendChild(elem);
		});
	});

	let htmlString = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name=”viewport” content=”width=device-width,initial-scale=1″><link rel="stylesheet" href="style.css"><script src="script.js"></script></head><body>${elementTemplate.innerHTML}</body></html>`;

	const script = document.createElement("script");

	// script 部分の処理
	components.forEach((component) => {
		if (component.script) {
			script.textContent += component.script.toString().match(/(?<=^\(\)(\s|\n|)\=\>(\s|\n|)\{)[^]+(?=\}$)/)[0].replace(/^\n/, "").replace(/\n\t\t/g, "\n");
			console.log(component.script.toString());
			console.log(component.script.toString().match(/(?<=^\(\)(\s|\n|)\=\>(\s|\n|)\{)[^]+(?=\}$)/)[0].replace(/^\n/g, "").replace(/\n\t\t/g, "\n"));
		}
	});

	document.body.appendChild(script);

	const button = document.querySelector(".build-button");

	console.log(`script:\n${script.textContent}\nstyle:\n${style.textContent}`);

	const downloadFiles = () => {
		const escapeHash = "{__hash__}";

		const scriptAnchor = document.createElement("a");
		const styleAnchor = document.createElement("a");
		const templateAnchor = document.createElement("a");

		scriptAnchor.download = "script.js";
		scriptAnchor.href = `data:,${script.textContent.replaceAll("#", escapeHash)}`;

		styleAnchor.download = "style.css";
		styleAnchor.href = `data:,${style.textContent.replaceAll("#", escapeHash)}`;

		templateAnchor.download = "index.html";
		templateAnchor.href = `data:,<!DOCTYPE html><html><head>${htmlString.replaceAll("#", escapeHash)}</body></html>`;

		scriptAnchor.click();
		styleAnchor.click();
		templateAnchor.click();
	}

	button.addEventListener("click", downloadFiles);
}