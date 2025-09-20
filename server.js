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

// 3. For Access Token -------------------------
let ACCESS_TOKEN = 'sl.u.AF86zc7DdsjwwePHwm1lS4t6UhPWwMkxCn-OQZPJcGN4_7Laqc-bqqtj69nZM0IACBot4WufuBuMGIxa7lW_J6DuUaFqIuN9AMH0VcxlnJ34F53l6fuEfeBQ0m9KDGiglG6ErR8-0MIqfMMihAXkSW62WHWm0S05n-ML6m5yt97cX3sm7-EoEVnAKJasyexs9VCtSf1XCIPuglZk4Hp67BkM_KvzZ5Mit-h1n9DLd5Kbgc8b0S7PkO6PWiop-uT7I2wOfXvDAcGzRgPVqU-EEr1vn_4tSj0CS5s55QlLIjnaIjsygqDVxbkcNmIhExIXwjpngi8L6CJn09Dhr3hn05EC7rSpCFUXVgwmZH251AAiRJz331Zzua80qYsgzs-85kHMZ3MIRsl4I81f9QYiZMAyfTFluDDK2u1LQODPvUd6pa560Awy09cZIsRkvdJ_tu217uinph2s62IHeos1dltZC_ggvUdmrsgFO2xb4PImR4HUyuojVeDoQbQMO9k-0UiGgoYutihKoruErXyPJ1HVGuJFVVvoja9l0cHk45ltV4De-amcJvFF5WtMmot_Yqqtf1xhVPhhYi8m7XKJhnmCvdLTe3q1GyKsMAWlFovHlPZVKvQUIkYZdX57sOw4sv3VoUgvVlGpk5QyqBsyhy4yv7tEHy9KI2t7Z6rzLKcFkkN51138zxInHUFJsYvf22xsosltiJlXUe8rnsVwVhtpy3FLhWfeDkCiRLUMH1D39Ecu9cA6x4TVeMhZPYwOEX_TwVkZotoigRM_iUDQI_hfT8aHHelzxVEEKpaGicknajQGj2F9jFegNLBvgtIJ1LvjYS1PtZ2Rafgo0vFpc3QjxGUkZOHi18PkBIMAGRc69XH_4bcqeZD9hBB-EiXoKgtdyqI-7Bli2839VyV2WKc45Du4nrN3VW8JBXAos8IB3Tl4JvB7GjpEFPdgIFrKi13jSbKPX2yExs_Wvu8u9zkjbsj0KLHxjWTDdmrXcnuWcvGmTDWweh8j4-CJ0U5BBRHww3cnouMgKpXPxY_1iXVo53vn6y2CWm-5LqtAcxTy8dzDp0MpnqR6hoL6XVBYzIr7r-uvAmI_DitCyqPFrokp6Atgl5zEKoRsvH9SdicQHljvXwbuklmNDs6u21tRNyx-RPf0KXqHiJIaNm-CjlR-IhRyPygp6RK0iVya8BKkV5ktaBkI_axrQzumEkr0XyCP6yDRVnlkNPIZoWjqjTKgotdgEIdJB9eWDBq51k4LwZBRbaLTRTmkXRkOl1RqHqzb_CFZ-nfmij9kWbVBCY41Wc9a0mefV_chUBNjV3p5eOyX-MfK-dFQS1HVzARMThCveNAHuIdfZaN2cdYAA8TXCQSosWKEs_On4lkdXaMFqXXM5TqqHjMOKE-TGcrbVisaQomyZ7Tc6XdLdstG_LCp';
// Access token is extremely lenghty and can be found in....
// get access token with this link on your browser (after creating a developer account with dropbox and also after getting Your Appkey)
// https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=YOUR_APP_KEY

// 4. For Temp Authoization code -------------------------
// you will need this Authorization Code Link direct link in the process to get your main refresh token (to get)
// AUTHORIZATION_CODE = "yZj9NDtoeToAAAAAAAAAHU1FTE09tRCI67Cy_anpRxY"; // This will only be used in the process of getting the Refresh Token
// get this auth code... do this below.
// paste this in your browser and click approve
// https://www.dropbox.com/oauth2/authorize?client_id=pasteYourAppkeyHere&token_access_type=offline&response_type=code
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

