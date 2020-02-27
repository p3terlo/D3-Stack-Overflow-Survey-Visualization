// Deals with inconsistency of names in different files. e.g. 'United States' vs 'United States of America' should be the same
function compareNames(a,b){
	if (a === b) {
		return true;
	} else if (a.length !== b.length) {
		let counter = 0;
		if (a.length < b.length) {
			let shortestWordLength = a.length;
			for (let i = 0; i < a.length; i++) {
				if (a[i] === b[i]) {
					counter++;
				}
			} if (counter === shortestWordLength) {
				return true;
			} else {
				return false;
			}
		} else {
			let shortestWordLength = b.length;
			for (let i = 0; i < b.length; i++) {
				if (b[i] === a[i]) {
					counter++;
				}
			} if (counter === shortestWordLength) {
				return true;
			} else {
				return false;
			}
		}
	}
}