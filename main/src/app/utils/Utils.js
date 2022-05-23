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

export const queryTable = async (tableName) => {
    await axios({
        method: 'get',
        url: '/api/db_get_all/',
        params: {
            table: tableName
        }
    }).then((response) => {
        console.log(response.data)
        // Display data
    }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    });
}

export const getRecord = async (tableName, recordId) => {
    await axios({
        method: 'get',
        url: '/api/db_get/',
        params: {
            table: tableName,
            id: recordId
        }
    }).then((response) => {
        console.log(response.data)
        // Display data
    }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    });
}

export const createNew = async (params) => {
    await axios({
        method: 'post',
        url: '/api/db_create/',
        params: params
    }).then((response) => {
        console.log(response.data)
        // Display data
    }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    });
}

export const updateRecord = async (params) => {
    await axios({
        method: 'post',
        url: '/api/db_edit/',
        headers: { "Content-Type": "multipart/form-data" },
        params: params
    }).then((response) => {
        console.log(response.data)
        // Display data
    }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    });
}

export const deleteRecord = async (params) => {
    await axios({
        method: 'post',
        url: '/api/db_delete/',
        params: params
    }).then((response) => {
        console.log(response.data)
        // Display data
    }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    });
}

export const delay = ms => new Promise(res => setTimeout(res, ms));

