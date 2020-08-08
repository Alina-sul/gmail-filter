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

const descendObjects = (array, param ) => {
    array.sort(function (a, b) {
        return b[param].length - a[param].length;
    });
    return array;
};

const cleanSender = (string) => {
    return string.slice(0, string.indexOf('<') - 1).replace(/[^\w\s]/gi, '')
};


const calculateWeekDays = (array) => {
    if(array.length > 1) {
        let days = [
            {day: 'Sun', count: 0},
            {day: 'Mon', count: 0},
            {day: 'Tue', count: 0},
            {day: 'Wed', count: 0},
            {day: 'Thu', count: 0},
            {day: 'Fri', count: 0},
            {day: 'Sat', count: 0},
        ];

        return array.reduce((acc,current) => {
            current.emails.map((x) => {
                if(new Date().getDate() - x.date.getDate() <= 7) {
                    switch (x.date.getDay()) {
                        case 0 : days[0].count += 1; break;
                        case 1 : days[1].count += 1; break;
                        case 2 : days[2].count += 1; break;
                        case 3 : days[3].count += 1; break;
                        case 4 : days[4].count += 1; break;
                        case 5 : days[5].count += 1; break;
                        case 6 : days[6].count += 1; break;
                        default: break;
                    }
                }
            });

            acc = days;
            return acc;
        },[])

    }

};


const calculateSendHours = (array) => {
    if (array.length > 1) {

        return array.reduce((acc,current) => {

            current.emails.map((email) => {
                if(new Date().getDate() - email.date.getDate() <= 7) {

                const time = email.date.getHours();

                if( acc[time] ){
                    acc[time].count += 1;
                } else {
                    acc[time] = {
                        time: time,
                        count: 1
                    }
                }
            }
            });
            return acc;
        },{})

    }
};

export { filterPayloadHeaders, retrieveRelevantData, descendObjects, calculateWeekDays, calculateSendHours };

