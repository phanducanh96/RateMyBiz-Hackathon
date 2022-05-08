import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'

const useFetchBlockchainData = () => {
    const { currentUser } = useAuth();
    const [currentUserId, setCurrentUserId] = useState();

    useEffect(() => {

        const getCurrentId = async (email) => {

            await axios({
                method: 'get',
                url: '/api/db_get_by_email/',
                params: { 'email': email },
            }).then((response) => {
                console.log(response.data)
                setCurrentUserId(response.data[0])
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            });
        }
        getCurrentId(currentUser.email);
    }, [])
    return { currentUserId }
}
export default useFetchBlockchainData;