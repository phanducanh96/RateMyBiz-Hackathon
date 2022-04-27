import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { PROFILE_DETAIL_ABI, PROFILE_DETAIL_ADDRESS } from '../../contracts-config'
import Web3 from 'web3';
import { Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { delay } from '../utils/Utils';

export class PublicProfile extends Component {
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

}
export default PublicProfile