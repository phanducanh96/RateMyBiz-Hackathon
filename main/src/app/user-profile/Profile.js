import React, { useRef, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { createNew, deleteRecord } from '../utils/Utils';
import useFetchBlockchainData from '../utils/useFetchBlockchainData';
import '../utils/Utils';

export default function Profile() {
    const { account, currentUserId, profileDetail, reviewPendingError, displayScore, reviewGivens, receivedReviews } = useFetchBlockchainData();
    const toPersonRef = useRef();
    const scoreRef = useRef();
    const contentRef = useRef();
    const [personType, setPersonType] = useState();
    const [score, setScore] = useState();
    const [error, setError] = useState();
    const [credentialParams, setCredentialParams] = useState();

    async function createReview(score, content, toPerson) {
        const error = '';
        console.log("Score: " + score);
        console.log("Content: " + content);
        console.log("toPerson: " + toPerson);
        const credentialParamsJson = JSON.parse(credentialParams);

        const verifiedStatus = await axios({
            method: 'get',
            url: '/api/get_verified/' + credentialParamsJson["vc_jwt"],
        }).then((response) => {
            console.log(response.data);
            const verifiedStatus = response.data.status;
            return verifiedStatus;
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
        console.log(verifiedStatus);

        if (verifiedStatus == "success") {
            try {

                const entityData = await axios({
                    method: 'get',
                    url: '/api/db_get_entity_by_name/',
                    params: {
                        name: toPerson
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

                console.log(entityData);
                console.log(entityData[0].type);
                console.log(entityData[0].id);
                await profileDetail.methods.createReview(score, content, toPerson, entityData[0].type, entityData[0].id).send({ from: account })
                    .once('receipt', (receipt) => {
                        const params = { table: "review", score: score, content: content, from_entity_id: currentUserId, to_entity_id: entityData[0].id };
                        createNew(params);
                    })
            } catch {
                error = 'Something wrong, cannot update contract or update db!';
            }
        } else {
            error = 'Cannot Verified Identity!';
        }
        setError(error);
        window.location.reload()

    }

    async function updateReview() {
        const error = '';
        const credentialParamsJson = JSON.parse(credentialParams);
        const verifiedStatus = await axios({
            method: 'get',
            url: '/api/get_verified/' + credentialParamsJson["vc_jwt"],
        }).then((response) => {
            console.log(response.data);
            const verifiedStatus = response.data.status;
            return verifiedStatus;
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
        console.log(verifiedStatus);

        if (verifiedStatus == "success") {
            try {
                const pendingReviews = await axios({
                    method: 'get',
                    url: '/api/db_get_pending_reviews/',
                    params: { 'to_entity_id': currentUserId }
                }).then((response) => {
                    const pendingReviews = [];
                    for (var i = 0; i < response.data.length; i++) {
                        const pendingReview = response.data[i];
                        pendingReviews.push(pendingReview);
                    }
                    return pendingReviews;
                }).catch((error) => {
                    if (error.response) {
                        console.log(error.response);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                });

                console.log(pendingReviews);

                for (var i = 0; i < pendingReviews.length; i++) {

                    const entityData = await axios({
                        method: 'get',
                        url: '/api/db_get/',
                        params: {
                            table: "entity",
                            id: pendingReviews[i].from_entity_id
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

                    console.log("Score: " + pendingReviews[i].score);
                    console.log("Content: " + pendingReviews[i].content);
                    console.log("Name: " + entityData.name);
                    console.log("Type: " + entityData.type);
                    console.log("Id: " + pendingReviews[i].id);
                    await profileDetail.methods.createReviewReceived(pendingReviews[i].score, pendingReviews[i].content, entityData.name, entityData.type, pendingReviews[i].id).send({ from: account })
                    // .once('receipt', (receipt) => {

                    // })
                    //Temporarily delete review no matter what
                    const params = { table: "review", id: pendingReviews[i].id };
                    deleteRecord(params);
                }
            } catch {
                error = 'Something wrong, cannot update contract!';
            }
        } else {
            error = 'Cannot Verified Identity!';
        }

        setError(error);
        window.location.reload()
    }

    async function handleScore(event) {
        console.log(event.target.value);
        const score = event.target.value;
        setScore(score);
    }

    async function onFileChange(file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            setCredentialParams(reader.result);
        }
    }

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
                                                    {receivedReview.fromPerson}
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
                                                    {reviewGiven.toPerson}
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

            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Leave a Review</h4>
                        <form className="forms-sample" onSubmit={(event) => {
                            event.preventDefault()
                            createReview(scoreRef.current.value, contentRef.current.value, toPersonRef.current.value)
                        }}>
                            <Form.Group>
                                <label htmlFor="exampleInputName1">Business/Customer Name</label>
                                <Form.Control type="text" className="form-control" id="name" placeholder="Name" ref={toPersonRef} required />
                            </Form.Group>

                            <Form.Group onChange={handleScore}>
                                <label htmlFor="exampleInputCity1">Score</label>
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="ratingRadios" id="oneStar" value="1" ref={scoreRef} required />
                                        <i className="input-helper"></i>
                                        1 Star
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="ratingRadios" id="twoStars" value="2" ref={scoreRef} required />
                                        <i className="input-helper"></i>
                                        2 Stars
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="ratingRadios" id="threeStars" value="3" ref={scoreRef} required />
                                        <i className="input-helper"></i>
                                        3 Stars
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="ratingRadios" id="fourStars" value="4" ref={scoreRef} required />
                                        <i className="input-helper"></i>
                                        4 Stars
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="ratingRadios" id="fiveStars" value="5" ref={scoreRef} defaultChecked required />
                                        <i className="input-helper"></i>
                                        5 Stars
                                    </label>
                                </div>
                            </Form.Group>



                            <Form.Group>
                                <label htmlFor="exampleTextarea1">Review Content</label>
                                <textarea className="form-control" id="exampleTextarea1" rows="4" ref={contentRef} required></textarea>
                            </Form.Group>

                            <Form.Group>
                                <label>Credential Public Key</label>
                                <div className="custom-file">
                                    <input type="file" onChange={event => onFileChange(event.target.files[0])} required />

                                </div>
                            </Form.Group>
                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                            <button className="btn btn-light">Cancel</button>
                        </form>
                    </div>
                </div>
            </div >

            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Update Rating Score</h4>

                        <form className="forms-sample" onSubmit={(event) => {
                            event.preventDefault()
                            updateReview()
                        }}>
                            {reviewPendingError && <Alert variant="danger">{reviewPendingError}</Alert>}

                            <Form.Group>
                                <label>Credential Public Key</label>

                                <div className="custom-file">
                                    <input type="file" onChange={event => onFileChange(event.target.files[0])} required />
                                </div>

                            </Form.Group>

                            <button type="submit" className="btn btn-primary mr-2">Update Review</button>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}