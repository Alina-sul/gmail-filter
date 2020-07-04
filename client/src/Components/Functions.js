const func = {
    filterPayloadHeaders: (arr, keys) => {
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
        }, {})
    },
    retrieveRelevantData: function (array) {
        return array.reduce((acc,current) => {
             const from = () => {
                 const sender = func.filterPayloadHeaders(current.payload.headers,'From').sender;
                 const cut = sender.indexOf('<');
                 return sender.slice(0, cut-1).replace(/[^\w\s]/gi, '');
             };
             const currentEmail = {
                 id: current.id,
                 snippet: current.snippet,
                 ...func.filterPayloadHeaders(current.payload.headers,['Subject','Date']),
                 body: current.payload.parts !== undefined ?
                     current.payload.parts.filter(
                         (x) => x.mimeType === 'text/html' ? x : null
                     )[0].body.data : null
             };

             if(acc[from()]) {
                 acc[from()].emails = acc[from()].emails.concat([currentEmail]);
            } else {
                acc[from()] = {
                    emails: [currentEmail]
                }
            }

            return acc;
        },{})
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

export {func};
