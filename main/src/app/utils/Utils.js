import axios from 'axios';

global.currentUserGlobal = ''
global.currentIdGlobal = ''

export const readQrCode = (srcQrImg) => {
    axios({
        method: 'get',
        url: '/api/read_qr_code/',
        params: srcQrImg,
    }).then((response) => {
        console.log(response.data)
        // let img = URL.createObjectURL(response)

    }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    });
}

export const getCurrentId = (email) => {
    axios({
        method: 'get',
        url: '/api/db_get_by_email/',
        params: { 'email': email },
    }).then(function (response) {
        console.log(response.data)
        global.currentIdGlobal = response.data[0]
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    });

}

export const delay = ms => new Promise(res => setTimeout(res, ms));

