import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
import { PROFILE_DETAIL_ABI } from '../../contracts-config';
import Web3 from 'web3';
import { useAuth } from '../contexts/AuthContext';

export default function PublicProfile() {
    const [displayScore, setDisplayScore] = useState(0);
    const [reviewGivens, setReviewGivens] = useState([]);
    const [receivedReviews, setReceivedReviews] = useState([]);
    const [entityData, setEntityData] = useState();
    const [avatar, setAvatar] = useState();
    const location = useLocation();
    const { currentUser } = useAuth();

    useEffect(() => {
        console.log(location.state);
        const loadBlockchainDataView = async () => {
            const currentUserId = await axios({
                method: 'get',
                url: '/api/db_get_by_email/',
                params: { 'email': currentUser.email },
            }).then((response) => {
                console.log(response.data);
                return (response.data[0]);
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });


            const entityData = await axios({
                method: 'get',
                url: '/api/db_get/',
                params: { 'table': 'entity', 'id': currentUserId }
            }).then((response) => {
                console.log(response.data);
                return response.data;
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });

            setEntityData(entityData);

            const smartContractAddress = await axios({
                method: 'get',
                url: '/api/db_get/',
                params: { 'table': 'entity', 'id': entityData.id }
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

            const loadProfilePic =
                await axios({
                    method: 'get',
                    url: '/api/db_get_pic/',
                    params: {
                        id: entityData.id
                    },
                    responseType: 'blob'
                }).then((response) => {
                    console.log(response.data)
                    return response.data;
                    // Display data
                }).catch((error) => {
                    if (error.response) {
                        console.log(error.response)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                    }
                });
            if (loadProfilePic.size != 0) {
                loadProfilePic.preview = URL.createObjectURL(loadProfilePic);
                setAvatar(loadProfilePic);
            } else {
                setAvatar();
            }

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

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        }
    }, [avatar]);

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

            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>
                                        {entityData && <h4>Name: {entityData.name}</h4>}
                                        {entityData && <h5>Type: {entityData.type}</h5>}
                                        {entityData && <h5>Description: {entityData.about}</h5>}
                                    </td>
                                    <td>
                                        {avatar && (<img src={avatar.preview} />)}
                                        {!avatar && (<img src={require("../../assets/images/faces/default.jpg")} />)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
