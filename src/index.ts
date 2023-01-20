const digit = (c: string, invalid: boolean): number => {
	let res: number = parseInt(c);
	if (res < 0 || res > 9) {
		invalid = invalid || true;
		return -1;
	}
	return res;
};

export const validateId = (id: number): boolean => {
	const str = id.toString();
	if (str.length != 11) {
		return false;
	}
	let invalid = false;
	let oddSum: number = digit(str[0], invalid);
	if (invalid) {
		return false;
	}
	let evenSum = 0;
	for (let i = 1; i < 9; i += 2) {
		evenSum += digit(str[i], invalid);
		oddSum += digit(str[i + 1], invalid);
	}
	let firstChecksum = digit(str[9], invalid);
	let finalChecksum = digit(str[10], invalid);
	if (invalid) {
		return false;
	}
	let computedFinal = (oddSum + evenSum + firstChecksum) % 10;
	if (finalChecksum != computedFinal) {
		return false;
	}
	let first: number = (oddSum * 7 - evenSum) % 10;
	if (first < 0) {
		first += 10;
	}
	return firstChecksum == first;
};

export const validateName = (name: string): boolean => {
	if (name.length == 0) {
		return false;
	}
	return /^[A-Za-z\s]*$/.test(name);
};
