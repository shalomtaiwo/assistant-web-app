// ScriptGenerator.js
import React from "react";

function ScriptGenerator({ user }) {
	const script = `
    <script src="https://stellular-dieffenbachia-abdfac.netlify.app/index.js" data-userid=${user.uid}></script>
  `;

	const copyToClipboard = () => {
		const textArea = document.createElement("textarea");
		textArea.value = script;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("copy");
		document.body.removeChild(textArea);
		alert("Script copied to clipboard!");
	};

	return (
		<div>
			<button onClick={copyToClipboard}>Copy Script</button>
		</div>
	);
}

export default ScriptGenerator;
