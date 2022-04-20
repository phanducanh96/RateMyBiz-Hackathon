import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { PROFILE_DETAIL_ABI, PROFILE_DETAIL_ADDRESS } from '../../contracts-config'
import Web3 from 'web3';
import { Form } from 'react-bootstrap';

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
            reviewGivens: [],
            receivedReviews: [],
            personType: '',
            score: 0,
            error: ''
        }
    }

    render() {
        return (
            <div>

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
                                        <tr>
                                            <td className="py-1">
                                                <img src={require("../../assets/images/faces/face1.jpg")} alt="user icon" />
                                            </td>
                                            <td> Herman Beck </td>
                                            <td>
                                                <ProgressBar variant="success" now={100} />
                                            </td>
                                            <td> Test </td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">
                                                <img src={require("../../assets/images/faces/face2.jpg")} alt="user icon" />
                                            </td>
                                            <td> Messsy Adam </td>
                                            <td>
                                                <ProgressBar variant="danger" now={90} />
                                            </td>
                                            <td> Test2 </td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">
                                                <img src={require("../../assets/images/faces/face3.jpg")} alt="user icon" />
                                            </td>
                                            <td> John Richards </td>
                                            <td>
                                                <ProgressBar variant="warning" now={90} />
                                            </td>
                                            <td> Test 3 </td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">
                                                <img src={require("../../assets/images/faces/face4.jpg")} alt="user icon" />
                                            </td>
                                            <td> Peter Meggik </td>
                                            <td>
                                                <ProgressBar variant="primary" now={50} />
                                            </td>
                                            <td> Test 4 </td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">
                                                <img src={require("../../assets/images/faces/face5.jpg")} alt="user icon" />
                                            </td>
                                            <td> Edward </td>
                                            <td>
                                                <ProgressBar variant="danger" now={60} />
                                            </td>
                                            <td> Test 5 </td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">
                                                <img src={require("../../assets/images/faces/face6.jpg")} alt="user icon" />
                                            </td>
                                            <td> John Doe </td>
                                            <td>
                                                <ProgressBar variant="info" now={65} />
                                            </td>
                                            <td> Test 6 </td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">
                                                <img src={require("../../assets/images/faces/face7.jpg")} alt="user icon" />
                                            </td>
                                            <td> Henry Tom </td>
                                            <td>
                                                <ProgressBar variant="warning" now={20} />
                                            </td>
                                            <td> Test 7 </td>
                                        </tr>
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
                                    <label>Verification QR Code</label>
                                    <div className="custom-file">
                                        <Form.Control type="file" className="form-control visibility-hidden" id="customFileLang" lang="es" />
                                        <label className="custom-file-label" htmlFor="customFileLang">Upload image</label>
                                    </div>
                                </Form.Group>
                                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                <button className="btn btn-light">Cancel</button>
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

        this.setState({ reviewGivenCount })
        for (var i = 1; i <= reviewGivenCount; i++) {
            const reviewGiven = await profileDetail.methods.reviewGivens(i).call()
            this.setState({
                reviewGivens: [...this.state.reviewGivens, reviewGiven]
            })
        }
        console.log(this.state.reviewGivens)

        this.setState({ reviewReceivedCount })
        for (var i = 1; i <= reviewReceivedCount; i++) {
            const receivedReview = await profileDetail.methods.receivedReviews(i).call()
            this.setState({
                receivedReviews: [...this.state.receivedReviews, receivedReview]
            })
        }
        console.log(this.state.receivedReviews)

    }

    createReview(score, content, toPerson, personType, personId) {
        console.log("Score: " + score)
        console.log("Content: " + content)
        console.log("toPerson: " + toPerson)
        console.log("personType: " + personType)
        console.log("personId: " + personId)
        const error = ''
        try {
            this.state.profileDetail.methods.createReview(score, content, toPerson, personType, personId).send({ from: this.state.account })
                .once('receipt', (receipt) => {
                    window.location.reload()
                })
        } catch {
            error = 'Something wrong, cannot update contract!'
        }

        this.setState({ error })
        alert(error)
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
export default Profile