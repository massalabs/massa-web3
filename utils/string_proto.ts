interface String {
	replaceAll(search: string, replacement: string): string;
	padStart(targetLength: number, padString: string): string;
	padLeadingZeros(targetLength: number): string;
}

String.prototype.replaceAll = function(search, replacement) {
	const target = this;
	return target.replace(new RegExp(search, "g"), replacement);
};

if (!String.prototype.padStart) {
	String.prototype.padStart = function padStart(targetLength, padString) {
		targetLength = targetLength >> 0; // truncate if number or convert non-number to 0;
		padString = String((typeof padString !== "undefined" ? padString : " "));
		if (this.length > targetLength) {
			return String(this);
		}
		else {
			targetLength = targetLength - this.length;
			if (targetLength > padString.length) {
				padString += padString.repeat(targetLength / padString.length); // append to original to ensure we are longer than needed
			}
			return padString.slice(0, targetLength) + String(this);
		}
	};
}

String.prototype.padLeadingZeros = function (targetLength) {
	const value = String(this);
	const parts = value.split(".");
	const z = parts[0];
	const d = parts.length > 1 ? parts[1] : null;

	const padded = z.padStart(targetLength, "0");
	return padded + (d ? ("." + d) : "");
};