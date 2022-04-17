import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { PROFILE_DETAIL_ABI, PROFILE_DETAIL_ADDRESS } from '../../contracts-config'
import Web3 from 'web3';

export class Profile extends Component {
    state = {}
    componentDidMount() {
        this.loadBlockchainData();
    }
    // alert(this.props.reviewGivens)

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            reviewGivenCount: 0,
            reviewReceivedCount: 0,
            reviewGivens: [],
            receivedReviews: [],
        }
    }

    render() {

        return (
            < div className="col-lg-12 grid-margin stretch-card" >
                <ul id="taskList" className="list-unstyled">
                    {this.state.reviewGivens.map((reviewGiven, key) => {
                        return (
                            <div className="taskTemplate" key={key}>
                                <label>
                                    <span className="content">{reviewGiven.content}</span>
                                </label>
                            </div>
                        )
                    })}
                </ul>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Review Table</h4>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th> User </th>
                                        <th> Content </th>
                                        <th> Score </th>
                                        <th> Amount </th>
                                        <th> Deadline </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-1">
                                            <img src={require("../../assets/images/faces/face1.jpg")} alt="user icon" />
                                        </td>
                                        <td> Herman Beck </td>
                                        <td>
                                            <ProgressBar variant="success" now={100} />
                                        </td>
                                        <td> $ 77.99 </td>
                                        <td> May 15, 2015 </td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">
                                            <img src={require("../../assets/images/faces/face2.jpg")} alt="user icon" />
                                        </td>
                                        <td> Messsy Adam </td>
                                        <td>
                                            <ProgressBar variant="danger" now={90} />
                                        </td>
                                        <td> $245.30 </td>
                                        <td> July 1, 2015 </td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">
                                            <img src={require("../../assets/images/faces/face3.jpg")} alt="user icon" />
                                        </td>
                                        <td> John Richards </td>
                                        <td>
                                            <ProgressBar variant="warning" now={90} />
                                        </td>
                                        <td> $138.00 </td>
                                        <td> Apr 12, 2015 </td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">
                                            <img src={require("../../assets/images/faces/face4.jpg")} alt="user icon" />
                                        </td>
                                        <td> Peter Meggik </td>
                                        <td>
                                            <ProgressBar variant="primary" now={50} />
                                        </td>
                                        <td> $ 77.99 </td>
                                        <td> May 15, 2015 </td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">
                                            <img src={require("../../assets/images/faces/face5.jpg")} alt="user icon" />
                                        </td>
                                        <td> Edward </td>
                                        <td>
                                            <ProgressBar variant="danger" now={60} />
                                        </td>
                                        <td> $ 160.25 </td>
                                        <td> May 03, 2015 </td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">
                                            <img src={require("../../assets/images/faces/face6.jpg")} alt="user icon" />
                                        </td>
                                        <td> John Doe </td>
                                        <td>
                                            <ProgressBar variant="info" now={65} />
                                        </td>
                                        <td> $ 123.21 </td>
                                        <td> April 05, 2015 </td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">
                                            <img src={require("../../assets/images/faces/face7.jpg")} alt="user icon" />
                                        </td>
                                        <td> Henry Tom </td>
                                        <td>
                                            <ProgressBar variant="warning" now={20} />
                                        </td>
                                        <td> $ 150.00 </td>
                                        <td> June 16, 2015 </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts });
        const profileDetail = new web3.eth.Contract(PROFILE_DETAIL_ABI, PROFILE_DETAIL_ADDRESS)
        this.setState({ profileDetail })
        const reviewReceivedCount = await profileDetail.methods.reviewReceivedCount().call()
        const reviewGivenCount = await profileDetail.methods.reviewGivenCount().call()

        this.setState({ reviewGivenCount })
        for (var i = 1; i <= reviewGivenCount; i++) {
            const reviewGiven = await profileDetail.methods.reviewGivens(i).call()
            this.setState({
                reviewGivens: [...this.state.reviewGivens, reviewGiven]
            })
        }

        this.setState({ reviewReceivedCount })
        for (var i = 1; i <= reviewReceivedCount; i++) {
            const receivedReview = await profileDetail.methods.receivedReviews(i).call()
            this.setState({
                receivedReviews: [...this.state.receivedReviews, receivedReview]
            })
        }

    }
}
export default Profile