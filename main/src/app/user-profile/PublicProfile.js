import React from 'react'
import { Link } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import useFetchBlockchainData from '../utils/useFetchBlockchainData';

export default function PublicProfile() {
    const { account, currentUserId, profileDetail, reviewPendingError, displayScore, reviewGivens, receivedReviews } = useFetchBlockchainData();

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
