import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchSmartContractAddress = (currentUserId) => {
    const [smartContractAddress, setSmartContractAddress] = useState('');

    useEffect(() => {

        const getSmartContractAddress = async (id) => {

            await axios({
                method: 'get',
                url: '/api/db_get/',
                params: { 'table': 'entity', 'id': id }
            }).then((response) => {
                console.log(response.data)
                const res = response.data
                setSmartContractAddress(res.smart_contract)
                console.log(smartContractAddress)
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            });

        }
        getSmartContractAddress(currentUserId)
    }, []);

    return { smartContractAddress }
}
export default useFetchSmartContractAddress;