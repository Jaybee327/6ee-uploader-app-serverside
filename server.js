// Use Ai to assist you on areas you find difficult to understand.

// backend npm variables... from package.json files 
// Note ---- You "might" have to override the current json files if having difficulties (by reinstalling these npm vars) otherwise, leave as it's.
// Note ---- make sure json files are in same folder with the server.
const express = require('express');
const axios = require('axios');
const multer = require('multer');
const upload = multer();

const app = express();
const port = 3000;

// 1. For App Key -------------------------
const APP_KEY = 't1e9xnc0j0p74kb'; // create a new app key: Go to the Dropbox Developer Dashboard (https://www.dropbox.com/developers) and create a new app (call it whatever). This will give you access to the Dropbox API,
// find and click Generate an access token for your app. This token will allow your app to access your Dropbox account via this app.

// 2. For App Secret -------------------------
const APP_SECRET = 'hemfrt8veqsk26j'; // you'll also find app secret code in the dash board...

// 3. For Access Token -------------------------
let ACCESS_TOKEN = 'sl.u.AFzAyDIf7wIPpK9Auq2-siQzi7yhigVSVJw1bSEGOSbhOBBBKaqGNG5P6GiQp3g9hm0IRLkqgs111AMIEnvcMbq5RGGwwgE2uRlbn15LCRHRvmUkvvbAaYF7KyD6mOXFfOALh1TX9dpT43bW_lGy7sQft3njNgZLL5p3yRTCL6IaeuceMwijX677LYk0jNei30X6Qv1C7T5VvuQKlEa6PAUkIH2kfK_0grw3JMTX-0EEaDve-gGKdQauVA5kPOt8dgxmRjRqHBNS0bxdTHXIJcUsjvA-E9P6fE2pnyys5uIckJcE2WrKITw6SgDRRGhmdmdMiQjVAjoPCPxAHAis4eD5_oTPnqFBFx3Ca0HfKZNyTgucDjovMmOz8PY5OlxKXLQxXTkJv6etrc3JKfrgBlCkXStirTC49fxJfnqkJXaaq357N6WkZtjXOmmzUt7K5Gw3AX_3186O-pw09l16ItOWEh2mwLP0h6LJkKC-SprR3Rv0j1-z8K78Ja1rBg8kjPCAhGGQHmunIBrsjybLCRuvKonD262UYdt6V2BN2cCsrvlfB1ADQJAWQgT7LwgLhJs-r1GQvQFbX36yMBApYdqVKOi1tO2si9tPbRx7bMlPOPf3CRf4j1VTnQ2LGE3kgJy9WDGok5SERAVeNnhVQS0L_Jf6mrYYQnJevC8kwLwqH255CHcEYRMoHyrHN3xUUHYrYysq9TOFVnOnXV_mIUo6_Mv3PcaqEhvNR6qnyxlG7U7f4fGMsxv-L1Adlgor8YKfEdTIsi3jDNF5YlI-JgS9ZUPWn8dlGcLn3YE4zdZUSwfLYV4AUbDucIV0JumXKbesf2k15PB0-jFT-7dzqKP4PwmZFgpxJk8zy8YtHOue58MVId-JU30xHKCwDJW7ACzsIBYjn0m6-kkoVDpMJ8fLlU3ScnrqcbzB-l_QO8H0nwrwIkB7muIrogowvnC1gWecD1MtwhVkbXLSZ904RJ3Bk_fQxzqQUStZM-vZW8OjpjW2S_irwodAwfZOODpMP7gNDmbH6AGvFhmAp77HA6P1VgYP7or6OIcIRQceBLK02FaUxVdBmJRMhfCskmtT2fiY-Qx7aQK6N95UArXgH6qmYjQ5U6tIWzXf0TN1n_o-6YSNtI122JE8soRyxNDkllglkekIv6vs5bZzfdKesGg9GLRo255HE9iWSSA0NHWwFN0DXnzkUji75cL6EaX3TZFcTCRFqde84tjjh7bCBXZWrLO1XREDtLcW33B7vJu6k-_E6nVAcRwcJL9aeewjGAW0BtNu86gNFYw6Jdgl_KQZoUUq_dwjZMLmb6jkPd7cveuJy5ThvdKZSf0EIp0A6M9pKsFjibrEx0y74RCvPwesZxUlDk7jxH8m57SW71pt8Ur6ifuTjf8ReL16JJLpFsCesAi2fC-TZregCNmg4BoI';
// Access token is extremely lenghty and can be found in....
// get access token with this link on your browser (after creating a developer account with dropbox and also after getting Your Appkey)
// https://www.dropbox.com/oauth2/authorize?client_id=pasteYourAppkeyHere&token_access_type=offline&response_type=code

// 4. For Temp Authoization code -------------------------
// you will need this Authorization Code Link direct link in the process to get your main refresh token (to get)
// AUTHORIZATION_CODE = "P6SxvwI4BIUAAAAAAAAAVD9Vkmd1qQZhvdvUkeZmQZT"; // This will only be used in the process of getting the Refresh Token
// get this auth code... do this below.
// paste this in your browser and click approve
// https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=YOUR_APP_KEY
// Save it somewhere you will see where to use it below.

// 5. For Main Refresh token -------------------------
const REFRESH_TOKEN = 'rlFloC6oG80AAAAAAAAAAXDCpHJohUrVy5ceysy4o5SF0qHxcF3zof-k4DDL_B4X'; // (from CMD [process below]) It sould be in this format.

// get refresh token with this in CMD (this token refreshes automatically forever) - choose your method below [which ever works or is simpler to you]

// 1. first method (paste whats below in CMD). ---- dont use this method (skip)
// curl -X POST \
// https://api.dropboxapi.com/oauth2/token \
// -d "grant_type=refresh_token&refresh_token=YOUR_REFRESH_TOKEN" \
// -u YOUR_APP_KEY:YOUR_APP_SECRET


// 2. best method (paste whats below in CMD).
// curl --location --request POST "https://api.dropboxapi.com/oauth2/token" --user "YOUR_APP_KEY:YOUR_APP_SECRET" --header "Content-type: application/x-www-form-urlencoded" --data-urlencode "code=AUTHORIZATION_CODE" --data-urlencode "grant_type=authorization_code"

	


// dont edit anything below except an expert.
const refreshAccessToken = async () => {
    try {
        const response = await axios.post('https://api.dropbox.com/oauth2/token', 
            `grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}&client_id=${APP_KEY}&client_secret=${APP_SECRET}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        const newAccessToken = response.data.access_token;
        ACCESS_TOKEN = newAccessToken;
        return newAccessToken;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
};

// create a folder in your dropbox folder and sve files inside
const DROPBOX_FOLDER = '/DropUploadApp';

app.use(express.json());

const cors = require('cors');
app.use(cors({
  origin: '*'
}));

// app.use(cors({
//   origin: '*'
// }));

const uploadFile = async (req, res, file, filename) => {
    try {
        const path = `${DROPBOX_FOLDER}/${filename}`;

        const headers = {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': JSON.stringify({
                path,
                mode: 'add',
                autorename: true,
                mute: false
            })
        };

        const response = await axios.post('https://content.dropboxapi.com/2/files/upload', file, { headers });

        if (response.status === 200) {
            res.send(`File uploaded to ${path}`);
        } else {
            res.status(500).send(`Error uploading file: ${response.statusText}`);
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            await refreshAccessToken();
            await uploadFile(req, res, file, filename);
        } else {
            console.error('Error uploading file:', error);
            res.status(500).send('Error uploading file');
        }
    }
};

// Endpoint to upload files to Dropbox
app.post('/upload-file', upload.single('file'), async (req, res) => {
    await uploadFile(req, res, req.file.buffer, req.body.filename);
});

// Endpoint to upload text to Dropbox
app.post('/upload-text', async (req, res) => {
    await uploadFile(req, res, Buffer.from(req.body.text), req.body.filename + '.txt');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
