import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
import { PROFILE_DETAIL_ABI } from '../../contracts-config';
import Web3 from 'web3';

export default function PublicProfileView() {

    const [displayScore, setDisplayScore] = useState(0);
    const [reviewGivens, setReviewGivens] = useState([]);
    const [receivedReviews, setReceivedReviews] = useState([]);
    // const [entityData, setEntityData] = useState();
    const location = useLocation();

    useEffect(() => {
        console.log(location.state);
        const loadBlockchainDataView = async () => {
            const entityData = await axios({
                method: 'get',
                url: '/api/db_get_entity_by_name/',
                params: {
                    name: location.state
                }
            }).then((response) => {
                const entityData = response.data;
                return entityData;
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
            console.log(entityData[0].id);
            // setEntityData(entityData);

            const smartContractAddress = await axios({
                method: 'get',
                url: '/api/db_get/',
                params: { 'table': 'entity', 'id': entityData[0].id }
            }).then((response) => {
                console.log(response.data);
                const res = response.data;
                return (res.smart_contract);
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });

            const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
            await window.ethereum.enable();
            const profileDetail = new web3.eth.Contract(PROFILE_DETAIL_ABI, smartContractAddress);
            const reviewReceivedCount = await profileDetail.methods.reviewReceivedCount().call();
            const reviewGivenCount = await profileDetail.methods.reviewGivenCount().call();
            const displayScore = await profileDetail.methods.displayScore().call();
            setDisplayScore(displayScore);

            const tempReviewGivens = [];
            for (var i = 1; i <= reviewGivenCount; i++) {
                const reviewGiven = await profileDetail.methods.reviewGivens(i).call();
                tempReviewGivens.push(reviewGiven);
            }

            setReviewGivens(tempReviewGivens);
            console.log("Given Reviews:");
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
        loadBlockchainDataView();
    }, [location]);

    return (
        <div>
            <div className="col-md-6 grid-margin stretch-card average-price-card">
                <div className="card text-white">
                    <div className="card-body">
                        <div className="d-flex justify-content-between pb-2 align-items-center">
                            <h2 className="font-weight-semibold mb-0">{displayScore}/5</h2>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h5 className="font-weight-semibold mb-0">Rating Score</h5>
                        </div>
                    </div>
                </div>
            </div>

            < div className="col-lg-12 grid-margin stretch-card" >
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Reviews Received</h4>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th> User </th>
                                        <th> Business/Customer </th>
                                        <th> Score </th>
                                        <th> Review's Content </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {receivedReviews.map((receivedReview, key) => {
                                        return (
                                            <tr key={key}>
                                                <td className="person">
                                                    <Link to={
                                                        {
                                                            pathname: '/public-profile-view',
                                                            state: receivedReview.fromPerson
                                                        }}>{receivedReview.fromPerson}</Link>
                                                </td>
                                                <td> {receivedReview.personType} </td>
                                                <td>
                                                    <ProgressBar variant="success" now={20 * receivedReview.score} />
                                                </td>
                                                <td> {receivedReview.content} </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >

            < div className="col-lg-12 grid-margin stretch-card" >

                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Reviews Given</h4>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th> User </th>
                                        <th> Business/Customer </th>
                                        <th> Rating </th>
                                        <th> Review's Content </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviewGivens.map((reviewGiven, key) => {
                                        return (
                                            <tr key={key}>
                                                <td className="person">
                                                    <Link to={
                                                        {
                                                            pathname: '/public-profile-view',
                                                            state: reviewGiven.toPerson
                                                        }}>{reviewGiven.toPerson}</Link>
                                                </td>
                                                <td> {reviewGiven.personType} </td>
                                                <td>
                                                    <ProgressBar variant="success" now={20 * reviewGiven.score} />
                                                </td>
                                                <td> {reviewGiven.content} </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}
