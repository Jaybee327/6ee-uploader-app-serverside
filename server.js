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
const APP_KEY = 'lzcdiqg8kbuq35u'; // create a new app key: Go to the Dropbox Developer Dashboard (https://www.dropbox.com/developers) and create a new app (call it whatever). This will give you access to the Dropbox API,
// find and click Generate an access token for your app. This token will allow your app to access your Dropbox account via this app.

// 2. For App Secret -------------------------
const APP_SECRET = '5s1v2waqaszia1v'; // you'll also find app secret code in the dash board...

// 3. For Access Token and refresh token (do this step fast) -------------------------
// obtain authorise code first by pasting the link below on your browser...
// https://www.dropbox.com/oauth2/authorize?client_id=YourAppKeyHere&token_access_type=offline&response_type=code ---- this link gives u auth code
// then paste auth code in between the follwing link below and paste in CMD to get access and refresh token
// curl --location --request POST "https://api.dropboxapi.com/oauth2/token" --user "Your-APP_KEY:Your-APP_SECRET" --header "Content-type: application/x-www-form-urlencoded" --data-urlencode "code=PasteAuthCodeHere" --data-urlencode "grant_type=authorization_code"
// 

let ACCESS_TOKEN = 'sl.u.AF8-JHXzDJEwGigCjgYKpJZVTBQBAXN-ia-wuALnUoz0uHJzRNf0sX8klJTIfQmKOFKgCW2XEKEWBI-irBjUgrsPfrud8xV2dH1vWkhVkWsay9GgaxLqYIwMXG3mGqESYbQ-COWo02wc-PEEoV7k7Gvplw48gVnmexaobyq4hMIr9cHmKqqDqL7ThH8sQZD6V_tHFatXD4k9jtVAV__fTcevpzYVx4U0Xm0LkFApqrGfLVymHgALRvDnaU-iEkl5sRTUywsOLxBF4v-oqUxOC8uH3EtJbUNbj51MlSFAokHZj8AFc2dtCQ_A2BWdABecxBtLVJOUhWsWlRycESFSrUVVygkB7pMXZM_QNbLlNNHE8ZEYJVzs5ILSBR_-4ubSbEC-8km8EYyUSPNBrzglhzsv1cj6QdepcTdhGJlM-UtvaROghpmewEjOLOY1XqKgRBJ4xqD5sEDn019ro6deu5odeJ1G1VKvLxmB5kULGMYxF382XC2KdgsvlJyVZkK0uuw4bu5_lo5vMvv9_TTQ7tGgW1fG0daYcG3Nm3EG78-1D6RxKtMiAYubjOEM_A3SsQYB9Vw800vsdY0k8vNiaWF3AMuKVTqVi0BBgAKu3_55HQ9g6GKaAIJIXRM944yCzyIth-GXSWyAQB6kba6E6hb4xUsJOM8IwU08P8rcK3Ax1Vf4s_ipTxdA7nYwifv_CyRFs_n-o7QWlr0a0aTFtRaDdxlC15JOLUNkN-VZ82m8r2ej3R4k9afdM8cZYP4jjFEq7C1NNksvEkgwvuwfhEGJUb5dWlK-Zrf6_vDKsReXqvwzPuRvsgWrxpw1749Dw78WcKHvrHUpgDg465q4kHEEz84NdT6WjPFLLv6Oh_FSG0OEuo8rLW5iA2i2EWkg4CTSt4B-Gz6XFc1DGjD901pGfHms5aGOtOSxzlOdjy8Vi3zWgnWDosh2wevvNW9mtdODJUaYEtjzj6jwmNWQMitR5BcP4nZXGby-DNKIBLRMNHjUPDxq1TDrv78ygTFwquDVja70TZmvLKWOQ_Cl3IGKv9fOYTHOxVCK_5VpI8x5lvH7qrk5q_Lw117AK9V_YKKOYlWMebUcQjkzDcKOjS8bul9RMrl6O0S3bLZzADio4LDU7AHc5CieF8W49jnru1gMdkBjZaXzh4bE6qBOK-Yt8kws6X9k_MIfvI3DaW2n2SWXIGi0zP9HNsKjvM9zK-k0Na6o_jqATLiyxD_YpVRth9kHcwJXsetYPtE5Sqf86hD5IutPE4AVr3PWR71PYhdgvr_5YKeqCIoeMeukyzJiXmhvgjWxCracgy4_r5su8WEYYvgj0di9t3hG_c1F9xf6hBahOTMPAezBOF7sRuGDy44aJ2U5vvyNj27Er01zgrXUTbSdIQquDtOsLj_nyWN95vqw4tSm9dwEcsQfacAW';
const REFRESH_TOKEN = 'IFoV8x4Nvn8AAAAAAAAAAYYepmpjdAWxlJw9nKR_bBVFDG7Q4glRRPVXOmV';





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
