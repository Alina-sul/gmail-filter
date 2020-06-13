const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 5000;

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = 'token.json';


const route = express.Router();

fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content), messagesList);

});

app.use(route);
app.listen(port, () => console.log(`listening at http://localhost:${port}`));


function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}
function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

function listLabels(auth) {
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.labels.list({
        userId: 'me',
    }, (err, res) => {
        if (err) return console.log('for listLabels The API returned an error: ' + err);
        const labels = res.data.labels;
        if (labels.length) {
            app.get('/test', function (req, res) {
                res.send(labels)
            });
        } else {
            return 'no labels here'
        }
    });
}

function messagesList(auth) {
    const gmail = google.gmail({version: 'v1', auth});
    return gmail.users.messages.list({
        userId: 'me',
    }, (err, res) => {
        if (err) return console.log('for messagesListIDs The API returned an error: ' + err);
        const messagesIDsList = res.data.messages.map(value => value.id);
        return messagesData(auth, messagesIDsList);
      });

}

function messagesData(auth, list) {
    const gmail = google.gmail({version: 'v1', auth});

    const promises = list.map((id) => {
        return gmail.users.messages.get({
            userId: 'me',
            id
        }).then(response => response.data);
    });

    Promise.all(promises).then(responses =>
        route.get('/messages', (req, res) => {

            res.send(responses)
            // const promises = [
            //     Promise.resolve('alina'),
            //     Promise.resolve('yuri'),
            // ]
            //
            // Promise.all(promises).then((data) => {
            //     res.send(data)
            // })
        })
    );
}

// function messages(auth) {
//   const test = async() => {
//     let list;
//     try {
//       list = await messagesList(auth);
//     } catch (e) {
//       console.log(e)
//     }
//     //messagesData(auth,list);
//   }
//       console.log(test())
//
//   test();
// }

// function messagesData(auth, list) {
//     const gmail = google.gmail({version: 'v1', auth});
//     const data = async() =>
//     {
//         const result = await list.map(id,i => {
//         gmail.users.messages.get({
//             userId: 'me',
//             id: id
//         }, (err, res) => {
//             if (err) return console.log('for messageData The API returned an error: ' + err);
//             return res.data.payload;
//           console.log(result[i]);
//
//         });
//       });
//       return result;
//     }
//           return app.get('/messages', function (req, res) {
//                 res.send(data())
//           });
//
// }
