const func = {
    filterByArr: (arr, keys) => {
        return arr.reduce((acc, next) => {
            if (keys.includes(next.name)) {
                const name = next.name;
                switch (name) {
                    case 'From':
                        acc.sender = next.value;
                        break;
                    case 'Date':
                        acc.date = new Date(next.value);
                        break;
                    case 'Subject':
                        acc.subjectLine = next.value;
                        break;
                    default:
                        break;
                }
            }

            return acc;
        }, {sender: '', date: '', subjectLine: ''})
    },
    arrayForAnalysis: function (array) {
        return array.map((message) => {
            return {
                id: message.id,
                ...func.filterByArr(message.payload.headers, ['From', 'Date', 'Subject']),
                snippet: message.snippet,
                body: message.payload.parts !== undefined ?
                    message.payload.parts.filter(
                        (x) => x.mimeType === 'text/html' ? x : null
                    )[0].body.data : null

            };
        });
    },
    miliToDays: function (num) {
        return num * 1.1574074 * Math.pow(10, -8)
    },
    decode: function (input) {
        // Replace non-url compatible chars with base64 standard chars
        input = input
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        // Pad out with standard base64 required padding characters
        var pad = input.length % 4;
        if (pad) {
            if (pad === 1) {
                throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
            }
            input += new Array(5 - pad).join('=');
        }

        return input;
    }
};

export default func;
