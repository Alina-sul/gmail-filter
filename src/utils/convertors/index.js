const msToDays = (num) => {
    return num * 1.1574074 * Math.pow(10, -8)
};

const base64ToString = (input) => {
    input = input
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    // Pad out with standard base64 required padding characters
    const pad = input.length % 4;
    if (pad) {
        if (pad === 1) {
            throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
        }
        input += new Array(5 - pad).join('=');
    }

    return input;
};

export { msToDays, base64ToString };


