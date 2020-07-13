const filterPayloadHeaders = (arr, keys) => {
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
    };

const retrieveRelevantData = (array) => {
    return array.reduce((acc,current) => {

        const sender = cleanSender(filterPayloadHeaders(current.payload.headers, 'From').sender);

        const currentEmail = {
            id: current.id,
            snippet: current.snippet,
            ...filterPayloadHeaders(current.payload.headers, ['Subject', 'Date']),
            body: current.payload.parts ?
                current.payload.parts.filter(
                    (x) => x.mimeType === 'text/html') : current.payload.body
        };
            if(acc[sender]) {
                         acc[sender].emails = acc[sender].emails.concat([currentEmail]);
                    } else {
                        acc[sender] = {
                            sender: sender,
                            emails: [currentEmail]
                        }
                    }

                    return acc;
            },
        {})
};

const descendObjects = (array, param , ) => {
    array.sort(function (a, b) {
        return b[param].length - a[param].length;
    });
    return array;
};

const cleanSender = (string) => {
    return string.slice(0, string.indexOf('<') - 1).replace(/[^\w\s]/gi, '')
};
export { filterPayloadHeaders, retrieveRelevantData, descendObjects };

