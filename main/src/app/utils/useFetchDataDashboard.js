import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchDataDashboard = () => {
    const [entityDatas, setEntityData] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            axios({
                method: 'get',
                url: '/api/db_get_businesses/'
            }).then((response) => {
                console.log(response.data)
                setEntityData(response.data)
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            });
        }

        fetchData();

    }, []);

    return { entityDatas };

}

export default useFetchDataDashboard;