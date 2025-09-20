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
const APP_KEY = '1vva13287tatkzs'; // create a new app key: Go to the Dropbox Developer Dashboard (https://www.dropbox.com/developers) and create a new app (call it whatever). This will give you access to the Dropbox API,
// find and click Generate an access token for your app. This token will allow your app to access your Dropbox account via this app.

// 2. For App Secret -------------------------
const APP_SECRET = 'j6xn07nel550jma'; // you'll also find app secret code in the dash board...

// 3. For Access Token and refresh token -------------------------
// obtain authorise code first by pasting the link below on your browser...
// https://www.dropbox.com/oauth2/authorize?client_id=1vva13287tatkzs&token_access_type=offline&response_type=code ---- this link gives u auth code
// then paste auth code in between the follwing link below and paste in CMD to get access and refresh token
// curl --location --request POST "https://api.dropboxapi.com/oauth2/token" --user "1vva13287tatkzs:j6xn07nel550jma" --header "Content-type: application/x-www-form-urlencoded" --data-urlencode "code=yZj9NDtoeToAAAAAAAAAIZmKq3FvMLqvTpsXJFpsQWQ" --data-urlencode "grant_type=authorization_code"

let ACCESS_TOKEN = 'sl.u.AF-1_CmHC5Uqhx-8bXYXToaZCtUTGTYhmdrUmv_t0kQrwN-kGJukE7BOZ8zyZ2bAQxMSTPU4Xacj0MHsHT7rbPWe1Y1OHEhQujvMAVGqrSYNQBsyvHD10EsS7XlfpXeR1R4xyRJ_nhE-UI0diOeZNAI4k1_REDkNgBjExQlyq0FVkiVuJNYFGyfdVW3C3whF02SZtz4raBo4An_UGy0OqEc3ZtcqWOy48zuOzZVQ_jsqERFcR669aNZUvQ3Jp58AvrRhDtufRkNB-Jl0OMg9KvF74mkeMPfuEvmkYJJpmlCoNxj9yGJJOaOZCNJ1WL2KTCVHgTjnWFmk_M4UcXr8AMKzJ2dgUfRTYixjPwF02wWB7yYZKGKhMetSSd7vvc3UfI6xTcox8eyOPn37G7BpcRIideuU6hP6QkVNaG0M3eCPnqg_JGHxBxw8TjxAhqsUPzJMot61fLPHXW2X52Zo7cZvfbNzKd0oSJzgM6ssbjDpOXagVAWFRgeQ-9lxrl9W0ouN8Qt72bLIHL5KxWmTQ4n9qFGLcJBi5pDc2e2LCigKeXXIAl9e8W3IF9bgtMKtU0GCIT6oPWIR1vQ3evc9yHmDm67FOU58_Le03RCumelRSZtmW447sXt-lFYO6n_IEQH3UF64cdtllZlm39JiD1Xb5eCbE-ildBoObqRdMmFvE8rUsdL3ItAhKxU3deJIyAQxQddUckY8xLEqnPeS6hFXULsww6Jyb8xtqJNms8KEL1oOYD7UgR6pZGdpmJxJHBQ4UaavVZbeFqG-iwkSgaljggvOrybCQ01K5o5EfR01xOVgxsUugAUe0k39Ftxfrrja2UKpHk4yMR60ayC1BQiFPDgddZ0-9EcM-cmQO4xzuF6iRPTjWv6IA9yvpO4IoDWMJHIA8pnFH66kMXbdbMPNpBvq0OBA-1FEVeDCCLM5NwcZ2klCruRCyxcZ9qbSQltbfOASD3sLYJfa89BvfKlB4JD-xBnFwH7lMSzuAF2s-ksjNKdp-rWw4hVFMqh1SFPKm5YX_mBlSc0hLFJduuPKkUHebNggSjqJ-66zZlpdgwjBZ4NkIiWCm1kz4kDfGBKwz882bVmURS_-OD2dmmiGSzDUkAorcgxdhvHWLWdqtrD21XpfFCo2juLIxrbWRqohoPgmjKjV0wfFqFLpJ3nUqI9tFvlJakhRaKs1AOBb9Tt9yCN0XAdhGgFGSL2yPklZmrDqRLXYZZpRIawsyZyqWXzD-pFDm3q9lORBA9edQRTM-Pcd_XIP9sDbneAnDSXON0bbdRhokASZy8Lhkuu2sfQ7hR1T6VMaltqiM96TZYNNFp_5hBft9isF6ZqvVKAyW9tGDtKrYml2HD4-UtWMjjxEOZLn4HUbHzsb1QuyhBNS92l7OyiAzQFWPdEX2O03x0uIwlfwnosqrn8kAUSt';
const REFRESH_TOKEN = 'ao96GGSzLTIAAAAAAAAAAfsqryas4vx5eZi9Xo1dvO75JN1gsoi2488Xm7Tpbfdv';








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

// your static site demain ----
// global domain
const cors = require('cors');
app.use(cors({
//   origin: '*'
  origin: 'https://jaybee327.github.io'
}));
// if using github
// const cors = require('cors');
// app.use(cors({
//   origin: 'https://yourusername.github.io'
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


