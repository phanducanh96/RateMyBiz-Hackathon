import axios from 'axios';


export const readQrCode = (qrImg) => {
    axios({
        method: 'get',
        url: '/api/read_qr_code/',
        params: qrImg,
        responseType: 'json',
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
