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

export const queryTable = (tableName) => {
    axios({
        method: 'get',
        url: '/api/db_get_all',
        params: {
            table: tableName
        }
    }).then((res) => {
        console.log(res.data)
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
        url: '/api/db_get',
        params: {
            table: tableName,
            id: recordId
        }
    }).then((res) => {
        console.log(res.data)
        // Display data
    }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    });
}

export const createNew = (tableName, ...fields) => {
    axios({
        method: 'post',
        url: '/api/db_create',
        params: {
            table: tableName,
            data: fields
        }
    }).then((res) => {
        console.log(res.data)
        // Display data
    }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    });
}

export const updateRecord = (tableName, record_id, ...fields) => {
    axios({
        method: 'post',
        url: '/api/db_edit',
        params: {
            table: tableName,
            id: record_id,
            data: fields
        }
    }).then((res) => {
        console.log(res.data)
        // Display data
    }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    });
}

export const remove = (tableName, record_id) => {
    axios({
        method: 'post',
        url: '/api/db_delete',
        params: {
            table: tableName,
            id: record_id
        }
    }).then((res) => {
        console.log(res.data)
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

