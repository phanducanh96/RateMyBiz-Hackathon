import axios from 'axios';


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

export const verification = (verifierParams) => {
    const status = 'fail'

    axios({
        method: 'get',
        url: '/api/get_verified/',
        params: verifierParams,
        responseType: 'json'
    }).then((response) => {
        console.log(response.data)
        const res = response.data
        status = res.status
    }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    });
    return status
}

