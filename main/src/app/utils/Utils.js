import axios from 'axios';
import { useState } from 'react'


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

