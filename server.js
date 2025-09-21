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

// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });
// app.get('/', (req, res) => {
//     res.send('Server is running');
// });


// 1. For App Key -------------------------
const APP_KEY = '9ainwgnpz42252r'; // create a new app key: Go to the Dropbox Developer Dashboard (https://www.dropbox.com/developers) and create a new app (call it whatever). This will give you access to the Dropbox API,
// find and click Generate an access token for your app. This token will allow your app to access your Dropbox account via this app.

// 2. For App Secret -------------------------
const APP_SECRET = 'qy0x4fmege6uijj'; // you'll also find app secret code in the dash board...

// 3. For Access Token and refresh token -------------------------
// obtain authorise code first by pasting the link below on your browser...
// https://www.dropbox.com/oauth2/authorize?client_id=YourAppKeyHere&token_access_type=offline&response_type=code ---- this link gives u auth code
// then paste auth code in between the follwing link below and paste in CMD to get access and refresh token
// curl --location --request POST "https://api.dropboxapi.com/oauth2/token" --user "1vva13287tatkzs:j6xn07nel550jma" --header "Content-type: application/x-www-form-urlencoded" --data-urlencode "code=yZj9NDtoeToAAAAAAAAAIZmKq3FvMLqvTpsXJFpsQWQ" --data-urlencode "grant_type=authorization_code"
// 

let ACCESS_TOKEN = 'sl.u.AF81bn6RbY-pS5URanQai8dzMo1yPOTXtdJs5KhF3ZOy98-DL0rqe-bTLjPP_f-CullVTsrw8EVuN-9X1mjlaPpqZSCcuhyro7bDKqpuXrYtkDUS271RjBvVy7TRD0jqIpX0kcqShs_2llHXMnvMW1aKgUzI9DeAXNdHNlaToRU6_GoL9aHMLXWOi_HdS0kJ2ZkyNGW-fWO3Z8t8AFNm_N7pRQhZD_P7LY7L1W3TjHiH8d8QmUY2Gd4EB4i9xG3q919sJfhxyvqD1fOITcYwVSnTQTP57BYCPkQJ9yA4cCo3hP37ET_mfbUrOh9ZJ0f26Md6-G8yZF7RExtzeDr7M7s2L75FWXkspzU98m1DvcgNXF2Ra-za5-8o-gLyGwQONWq81ztM6M5h2E6zdaduVwYkG9KFeu2Bpbui4HzM68DBLnZX4QFMJ3OKHeCWwqTZ4Yn-d_75p_ElWUwWkAeXWG4_UjzeJr84oEHn5AfQECEv1R8SiQqQTPf9YfK0YpcjDNAQ61M_CiTXa9LyH_YbihonioINjaba3l8lBvkZvyPiZNqmn02wQdE7YIgoc7lJKBXki6yuNhlvwYeI7WCWsHi7sXHpqUAXK8hxhb5W0wAAKAsoGWrgJ26bH1Wiuz4ANghI6XLVIB7VlsuxNuOBcHQYuD1gdpV_vVOgiFGUAgcgxvOsAawhqUB2fKP3EM3QP1jq3Q7L7L1eB-4wGMqQWpnElPn_oH8qKOKrVsMWIF10cOcgvyi8HZ56S6t9kelFXnFKoD46mHIQ7qoG0r8lyuTilQHjqpiVktPnuIk-jtOhRDQNQ7VfekboO5ySl0MqsypD7AqXZSrMrU0847Ef69jkd9bxk_J0SzToBQAzE6zkRQ51fM5Gt20QvaascYnPvZv7nn1ZXjiZlhwmpU72IkU5J2Cfv7Z_zVjiUHKCPCMQLLteKuTFshVg8L-gdgjw1mw0uHaVfzMmzTgOPZjJUeeak_A11MV4E4zdfcKLBU66m87Xie4f_ftSlDO3lZshY1BPo_jxgqgPtoXs4HMLT5L_mgcnEOu_WqdxzNzTeZXb-1gYLs2vgisBv7VrFVRSon9ULrQDdWmERW-2vz4Cb6TE9HLqB-Na0WACL6fVTuaryzfhTnQMXCKGaTgh3LNFW5TvpfX5m3muRwxnfjdVJ3IZVCC2K-Ts9l5BNeM3ffrSDedWD7EuulrAawV-ChBAnbeQrCldrPEKYEpnupfyQTPiMgfCunMEzDmoMV1x0PjkHNyxy1s-hIRPU2FC7i0OZkDecPS316he9PhXeZn2rjgRixKuEuJED2dbqsHENilBy1FjInPuQAZIwoiyOoW9F3dPDuyoR7u7H0S-RUMo7nK4rvnrvx3e6W-8D-6KPBcn2GLIxc6E8pIWhCltWeGYwHHu2vG-5tYq-ZnvGhIW34mZ';
const REFRESH_TOKEN = 'VbSRFuE95uwAAAAAAAAAAZ0hDMLGP3f7JterGWqmIftnD';





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
// //   origin: 'https://sixeeinc-fileuploader-app.onrender.com'
//   origin: '*' // global
// }));
app.use(cors({
  origin: 'https://sixeeinc-fileuploader-app.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
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
