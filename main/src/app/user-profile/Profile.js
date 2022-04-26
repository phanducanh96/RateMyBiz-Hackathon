import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { PROFILE_DETAIL_ABI, PROFILE_DETAIL_ADDRESS } from '../../contracts-config'
import Web3 from 'web3';
import { Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { delay } from '../utils/Utils';

export class Profile extends Component {
    state = {}
    componentDidMount() {
        this.loadBlockchainData();
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            reviewGivenCount: 0,
            reviewReceivedCount: 0,
            displayScore: 0,
            reviewGivens: [],
            receivedReviews: [],
            personType: 'Customer',
            score: 5,
            error: '',
            credentialParams: '',
            verifiedStatus: 'fail',
            reviewPendingError: 'You have 5 Pending Reviews, please Update'
        }

    }

    render() {
        return (
            <div>
                <div className="col-md-6 grid-margin stretch-card average-price-card">
                    <div className="card text-white">
                        <div className="card-body">
                            <div className="d-flex justify-content-between pb-2 align-items-center">
                                <h2 className="font-weight-semibold mb-0">{this.state.displayScore}/5</h2>
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
                                        {this.state.receivedReviews.map((receivedReview, key) => {
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
                                        {this.state.reviewGivens.map((reviewGiven, key) => {
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
                                this.createReview(this.state.score, this.content.value, this.toPerson.value, this.state.personType, this.personId.value)
                            }}>
                                <Form.Group>
                                    <label htmlFor="exampleInputName1">Business/Customer Name</label>
                                    <Form.Control type="text" className="form-control" id="name" placeholder="Name" ref={(input) => { this.toPerson = input }} required />
                                </Form.Group>

                                <Form.Group>
                                    <label htmlFor="exampleInputName1">Person ID (Temporary)</label>
                                    <Form.Control type="text" className="form-control" id="personId" placeholder="Name" ref={(input) => { this.personId = input }} required />
                                </Form.Group>

                                <Form.Group onChange={this.handlePersonType}>
                                    <label htmlFor="exampleInputCity1">Person Type (Temporary)</label>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="personTypeRadios" id="businessOption" value="Business" onClick={(value) => { this.personType = value }} required />
                                            <i className="input-helper"></i>
                                            Business
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="personTypeRadios" id="customerOption" value="Customer" onClick={(value) => { this.personType = value }} defaultChecked required />
                                            <i className="input-helper"></i>
                                            Customer
                                        </label>
                                    </div>
                                </Form.Group>

                                <Form.Group onChange={this.handleScore}>
                                    <label htmlFor="exampleInputCity1">Score</label>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="ratingRadios" id="oneStar" value="1" ref={(value) => this.score} required />
                                            <i className="input-helper"></i>
                                            1 Star
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="ratingRadios" id="twoStars" value="2" ref={(value) => this.score} required />
                                            <i className="input-helper"></i>
                                            2 Stars
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="ratingRadios" id="threeStars" value="3" ref={(value) => this.score} required />
                                            <i className="input-helper"></i>
                                            3 Stars
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="ratingRadios" id="fourStars" value="4" ref={(value) => this.score} required />
                                            <i className="input-helper"></i>
                                            4 Stars
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="ratingRadios" id="fiveStars" value="5" ref={(value) => this.score} defaultChecked required />
                                            <i className="input-helper"></i>
                                            5 Stars
                                        </label>
                                    </div>
                                </Form.Group>



                                <Form.Group>
                                    <label htmlFor="exampleTextarea1">Review Content</label>
                                    <textarea className="form-control" id="exampleTextarea1" rows="4" ref={(input) => { this.content = input }} required></textarea>
                                </Form.Group>

                                <Form.Group>
                                    <label>Credential Public Key</label>
                                    <div className="custom-file">
                                        <input type="file" onChange={e => this.onFileChange(e.target.files[0])} required />

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
                                this.updateReview()
                            }}>
                                {this.state.reviewPendingError && <Alert variant="danger">{this.state.reviewPendingError}</Alert>}

                                <Form.Group>
                                    <label>Credential Public Key</label>

                                    <div className="custom-file">
                                        <input type="file" onChange={e => this.onFileChange(e.target.files[0])} required />
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

    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
        const profileDetail = new web3.eth.Contract(PROFILE_DETAIL_ABI, PROFILE_DETAIL_ADDRESS)
        this.setState({ profileDetail })
        const reviewReceivedCount = await profileDetail.methods.reviewReceivedCount().call()
        const reviewGivenCount = await profileDetail.methods.reviewGivenCount().call()
        const displayScore = await profileDetail.methods.displayScore().call()
        this.setState({ displayScore })

        this.setState({ reviewGivenCount })
        for (var i = 1; i <= reviewGivenCount; i++) {
            const reviewGiven = await profileDetail.methods.reviewGivens(i).call()
            this.setState({
                reviewGivens: [...this.state.reviewGivens, reviewGiven]
            })
        }
        console.log("Given Reviews:")
        console.log(this.state.reviewGivens)

        this.setState({ reviewReceivedCount })
        for (var i = 1; i <= reviewReceivedCount; i++) {
            const receivedReview = await profileDetail.methods.receivedReviews(i).call()
            this.setState({
                receivedReviews: [...this.state.receivedReviews, receivedReview]
            })
        }
        console.log("Received Reviews:")
        console.log(this.state.receivedReviews)

    }

    async createReview(score, content, toPerson, personType, personId) {
        console.log("Score: " + score)
        console.log("Content: " + content)
        console.log("toPerson: " + toPerson)
        console.log("personType: " + personType)
        console.log("personId: " + personId)
        const error = ''
        const credentialParamsJson = JSON.parse(this.state.credentialParams)
        this.verification(credentialParamsJson["vc_jwt"])
        await delay(1000)
        console.log(this.state.verifiedStatus)

        if (this.state.verifiedStatus == "success") {
            try {
                this.state.profileDetail.methods.createReview(score, content, toPerson, personType, personId).send({ from: this.state.account })
                    .once('receipt', (receipt) => {
                        window.location.reload()
                    })
            } catch {
                error = 'Something wrong, cannot update contract!'
            }

        } else {
            error = 'Cannot Verified Identity!'
        }
        this.setState({ error })
    }

    async updateReview() {
        const error = ''
        const credentialParamsJson = JSON.parse(this.state.credentialParams)
        this.verification(credentialParamsJson["vc_jwt"])
        await delay(1000)
        console.log(this.state.verifiedStatus)

        //Hard Code Writing to the smart contract
        if (this.state.verifiedStatus == "success") {
            try {
                this.state.profileDetail.methods.createReviewReceived(2, "Verified Test Update", "Ace", "Customer", 12).send({ from: this.state.account })
                    .once('receipt', (receipt) => {
                        window.location.reload()
                    })
            } catch {
                error = 'Something wrong, cannot update contract!'
            }
        } else {
            error = 'Cannot Verified Identity!'
        }

        this.setState({ error })
    }

    handlePersonType = event => {
        console.log(event.target.value);
        const personType = event.target.value
        this.setState({ personType })
    }

    handleScore = event => {
        console.log(event.target.value);
        const score = event.target.value
        this.setState({ score })
    }

    onFileChange = (file) => {
        const reader = new FileReader();
        reader.onloadend = this.handleFile;
        reader.readAsText(file)
    }

    handleFile = (e) => {
        const content = e.target.result;
        this.setState({ credentialParams: content });
        console.log(this.state.credentialParams)
    }

    verification = async (verifierParams) => {

        axios({
            method: 'get',
            url: '/api/get_verified/' + verifierParams,
        }).then((response) => {
            console.log(response.data)
            const verifiedStatus = response.data.status
            this.setState({ verifiedStatus })
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        });

    }
}
export default Profile