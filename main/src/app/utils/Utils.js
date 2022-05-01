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

export const queryTable = (tableName) => {
    axios({
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

export const getRecord = (tableName, recordId) => {
    axios({
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

export const createNew = (params) => {
    axios({
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

export const updateRecord = (params) => {
    axios({
        method: 'post',
        url: '/api/db_edit/',
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

export const deleteRecord = (params) => {
    axios({
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

