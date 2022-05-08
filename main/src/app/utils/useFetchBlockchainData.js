import { useEffect, useState } from 'react';
import { PROFILE_DETAIL_ABI } from '../../contracts-config'
import Web3 from 'web3';
import { updateRecord, delay } from '../utils/Utils'
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'

const useFetchBlockchainData = () => {
    const { currentUser } = useAuth();
    const [account, setAccount] = useState('');
    const [profileDetail, setProfileDetail] = useState();
    const [displayScore, setDisplayScore] = useState(0);
    const [reviewGivens, setReviewGivens] = useState([]);
    const [receivedReviews, setReceivedReviews] = useState([]);

    useEffect(() => {

        const loadBlockchainData = async () => {

            const currentUserId = await axios({
                method: 'get',
                url: '/api/db_get_by_email/',
                params: { 'email': currentUser.email },
            }).then((response) => {
                console.log(response.data)
                return (response.data[0])
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            });

            const smartContractAddress = await axios({
                method: 'get',
                url: '/api/db_get/',
                params: { 'table': 'entity', 'id': currentUserId }
            }).then((response) => {
                console.log(response.data)
                const res = response.data
                return (res.smart_contract)
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            });

            const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
            const profileDetail = new web3.eth.Contract(PROFILE_DETAIL_ABI, smartContractAddress);
            const reviewReceivedCount = await profileDetail.methods.reviewReceivedCount().call();
            const reviewGivenCount = await profileDetail.methods.reviewGivenCount().call();
            const displayScore = await profileDetail.methods.displayScore().call();
            setDisplayScore(displayScore)
            const params = { table: "entity", id: currentUserId, total_score: displayScore }
            updateRecord(params)

            const tempReviewGivens = [];
            for (var i = 1; i <= reviewGivenCount; i++) {
                const reviewGiven = await profileDetail.methods.reviewGivens(i).call()
                tempReviewGivens.push(reviewGiven);
            }

            setReviewGivens(tempReviewGivens);
            console.log("Given Reviews:")
            console.log(reviewGivens);

            const tempReceivedReview = [];
            for (var i = 1; i <= reviewReceivedCount; i++) {
                const receivedReview = await profileDetail.methods.receivedReviews(i).call();
                tempReceivedReview.push(receivedReview);
            }

            setReceivedReviews(tempReceivedReview);
            console.log("Received Reviews:");
            console.log(receivedReviews);

        }

        loadBlockchainData();

    }, []);
    return { account, displayScore, reviewGivens, receivedReviews }
}
export default useFetchBlockchainData;
