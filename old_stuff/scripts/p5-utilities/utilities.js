/* utilities.js */

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function quicksort(origArray) {
	if (origArray.length <= 1) {
		return origArray;
	} 
    else {
		var left = [];
		var right = [];
		var newArray = [];
		var pivot = origArray.pop();
		var length = origArray.length;

		for (var i = 0; i < length; i++) {
			if (origArray[i] <= pivot) {
				left.push(origArray[i]);
			} 
            else {
				right.push(origArray[i]);
			}
		}

		return newArray.concat(quicksort(left), pivot, quicksort(right));
	}
}

