import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import { Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { createNew, deleteRecord } from '../utils/Utils';
import useFetchBlockchainData from '../utils/useFetchBlockchainData';
import '../utils/Utils';

export default function Profile() {
    const { account, currentUserId, profileDetail, reviewPendingError, displayScore, reviewGivens, receivedReviews } = useFetchBlockchainData();
    const toPersonRef = useRef();
    const [credentialParams, setCredentialParams] = useState();
    const scoreRef = useRef();
    const contentRef = useRef();
    const [personType, setPersonType] = useState();
    const [score, setScore] = useState();
    const [createReviewError, setCreateReviewError] = useState('');
    const [updateReviewError, setUpdateReviewError] = useState('');
    const [createReviewSuccess, setCreateReviewSuccess] = useState('');
    const [updateReviewSuccess, setUpdateReviewSuccess] = useState('');
    const [toPersonSelect, setToPersonSelect] = useState('');
    const [allUserNames, setAllUserNames] = useState(['']);

    useEffect(() => {
        const loadUserNameDate = async () => {
            const allUserNames = await axios({
                method: 'get',
                url: '/api/db_get_all/',
                params: {
                    table: 'entity'
                }
            }).then((response) => {
                console.log(response.data);
                const nameArray = [];
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].id != currentUserId) {
                        nameArray.push(response.data[i].name);
                    }
                }
                return nameArray;
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });

            setAllUserNames(allUserNames);
            setToPersonSelect(allUserNames[0]);
        }
        loadUserNameDate();
    }, [currentUserId]);

    async function createReview(score, content, toPerson) {
        const createReviewError = '';
        const createReviewSuccess = '';
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
                        createReviewSuccess = 'Successfully created a review!'
                        createReviewError = ''
                    })
            } catch {
                createReviewError = 'Something wrong, cannot update contract or update db!';
                createReviewSuccess = '';
            }
        } else {
            createReviewError = 'Cannot Verified Identity!';
            createReviewSuccess = '';
        }
        setCreateReviewError(createReviewError);
        setCreateReviewSuccess(createReviewSuccess);
        // window.location.reload()
    }

    async function updateReview() {
        const updateReviewError = '';
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
                    updateReviewSuccess = 'Successfully updated reviews!';
                    updateReviewError = '';
                }
            } catch {
                updateReviewError = 'Something wrong, cannot update contract!';
                updateReviewSuccess = '';
            }
        } else {
            updateReviewError = 'Cannot Verified Identity!';
            updateReviewSuccess = '';
        }

        setUpdateReviewError(updateReviewError);
        setUpdateReviewSuccess(updateReviewSuccess);
        // window.location.reload()
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

    const handleSelect = (value) => {
        setToPersonSelect(value);
    };

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

            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Leave a Review</h4>
                        <form className="forms-sample" onSubmit={(event) => {
                            event.preventDefault()
                            createReview(scoreRef.current.value, contentRef.current.value, toPersonSelect)
                        }}>
                            {createReviewError && <Alert variant="danger">{createReviewError}</Alert>}
                            {createReviewSuccess && <Alert variant="success">{createReviewSuccess}</Alert>}
                            <Form.Group>
                                <label htmlFor="exampleInputName1">Business/Customer Name</label>
                                {/* <Form.Control type="text" className="form-control" id="name" placeholder="Name" ref={toPersonRef} required /> */}
                                <select className="form-control" id="selectName" onChange={event => handleSelect(event.target.value)}>
                                    {allUserNames.map((allUserName, key) => {
                                        return (
                                            <option key={key} value={allUserName}>{allUserName}</option>
                                        )
                                    })}
                                </select>
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
                            {updateReviewError && <Alert variant="danger">{updateReviewError}</Alert>}
                            {updateReviewSuccess && <Alert variant="success">{updateReviewSuccess}</Alert>}
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