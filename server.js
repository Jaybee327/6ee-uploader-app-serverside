// Follow every instruction carefully ----------------------------------------------------------------------
// Use Ai to assist you on areas you find difficult to understand.

// backend npm variables...
// Note ---- make sure json file is in same folder with the server.
const express = require('express');
const axios = require('axios');
const multer = require('multer');
const upload = multer();

const app = express();
const port = 3000;

// 1. For App Key -------------------------
const APP_KEY = '0rcnttyg74wgahw'; // create a new app key: Go to the Dropbox Developer Dashboard (https://www.dropbox.com/developers) and create a new app (call it whatever) select whichever option u see. This will give you access to the Dropbox API,
// find and click Generate an access token for your app. This token will allow your app to access your Dropbox account via this app.

// 2. For App Secret -------------------------
const APP_SECRET = 'kzwco8jrs1mn1l9'; // you'll also find app secret code in the dash board...

// Note - open the readme file in "help" folder before proceeding to next step.

// 3. For Access Token and refresh token (do this step fast) -------------------------
// obtain authorise code first by pasting the link below on your browser...
// --- pls ensure u've already enable all necessary permissions from the screenshot in Help folder before gettting access token and Refresh Token... to prevent getting the weak version of the refresh token. lol...
// https://www.dropbox.com/oauth2/authorize?client_id=YourAppKeyHere&token_access_type=offline&response_type=code ---- this link gives u auth code
// then paste the auth code in between the follwing link below and paste in CMD to get access and refresh token
// curl --location --request POST "https://api.dropboxapi.com/oauth2/token" --user "Your_APP_KEY:Your_APP_SECRET" --header "Content-type: application/x-www-form-urlencoded" --data-urlencode "code=PasteAuthCodeHere" --data-urlencode "grant_type=authorization_code"

let ACCESS_TOKEN = 'sl.u.AF9puILdP42cXxJmu4PLTcM0gftui21YV8aMC3HksGwVzKVguF8fm6CumBdZ2N697KzhzkMTQF6AUW979Pq7yAgLU3rb9kauxKi5-p6TUNMMZTi5Ml8seg2B6pZjmuMYOcfxIXwfxB956x0yP3GiyICYZhWBjVH1BHQhJ6M77mdK2SloJA2gkPjuA2JCuC_-VILRsJa3CHL_3rDuJcTrmNUpH4oGdQ26fcqyIkWSncbGKmNk8FluJxfyidGs_7chdzJYEYSYjPXgAizpHkcZUXn8Vvuwbgw3FqtRCOYRR4T2Imt1wyek6LW09VfYgzD1UVCKy7kfgxCo4_DIx579ENLCWiqBQBbrT45PLilGPn7k5BkOgSZM73nthNSUjATOYXEqsaem8JlDedPwYqD7BSLroctczZe4i2Lr3Wjhd4fL4dSIHfD53--YCaiwngYaaGgrso5G68asEQ2AVgl4q74oa0jZBb0DXzsQ573gmIqQu3dnHtgM3AQsNdLAn70muVM2Hj_8NmHfyBYjYVKc6Vs2MlhH_hAb6vgJckuQu9PowV-qtxBUHfF621KWZk10gW1Jzp5cgS3OVgzc-HHFRZAkOGP3_MaUjCqiIwhO-WzjrilyNGbBf8ls_InDVl51MDnOOvTHcRjxbS2oCpZSQNtNNm_hFZ5tWQuJ_BbMKm49VzGbpIhahBJd1AyUy0H-oiDsMhO1wbubrwTqlREtl2b9MbwNIuVPwtem5f2pAypsFuPKuS10Ki9i8ihvAkUJhKaQrzUJxRuXqLwA4FnC2zG-hlrIzrWHa8i7uGwT0mKb_khuOSvhDKzHRmMkCMCaE1yvQteG0uu203kykE26jR2hQ0hX5udMnx9UjlxfymJTBeWzO554L1veqfwL48tYnqd0y-flYeQ82H-QTa5FdjGQRneXW4cJTwpy1ZFviN3-c4uLQGwlJrNiMZ48lEZeFusQDcYlWuqAMoDv-LwXsZdo4QIfa6xE71B7bHUn0GiqfUlzeS6A6tzJK6tn-ZDSuT4xN5mco606goVz8UpsTvOr51Wfy7BJzY-ESz4Qk0EJwlWLzdYmnn1x90w37m-xF2-bYM8fCjQpxAITexWPGcj39-A2e6iycSsbp2ym57RHLt_UKISngp162NVofrqPHbAvciawGmXS-tCt7STQYLv0dCHcDao97rUD1QE379e1Xthl_rbTjeZl3j7q9g0jhiOR_b1beKAQMA0RvHJbsXe4XQT-y6FkVyPu1mDbzptebrPBLPx8mR5Y9zkHpDveeySZ1qmujMS6ibXCnIq6t8OCYJ-RrZXFBsX6woMQ1nSkKNsYUqm2VjCsdQSmH2aARXHvBcocJAa80Xm_I6rAZNsL2Lv_9hOh1i84g3akEZeRg-WQyulnIpEAGyic-xu_UjPmFXoaiq60lOQg9eGjV79YZjdVc8fbH3ZTS1iLVJ10iQ';
const REFRESH_TOKEN = 'd7NBMbQgCjEAAAAAAAAAAZda7WdQBi7zWcnBjICDpIpZ';





// One more thing to edit.. Your've done the hardest part (your frontend link)...
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

const DROPBOX_FOLDER = '/DropApp';

app.use(express.json());

// paste your frontend static client side web url here witout the last foward slash '/' as shown below
const cors = require('cors');
// app.use(cors({
    // }));
    app.use(cors({
    origin: 'https://sixeeinc-fileuploader-app.onrender.com',
    // //   origin: '*' // global
    // //   origin: 'https://sixeeinc-fileuploader-app.onrender.com'
    // //   origin: 'https://username.github.io'
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


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
