import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { ProgressBar } from 'react-bootstrap';

export default function PublicProfileView() {

    const [displayScore, setDisplayScore] = useState(0);
    const [reviewGivens, setReviewGivens] = useState([]);
    const [receivedReviews, setReceivedReviews] = useState([]);
    const location = useLocation();

    useEffect(() => {
        console.log(location);
    }, []);

    return (
        <div>
            <h4>Hello</h4>
        </div>
        // <div>
        //     <div className="col-md-6 grid-margin stretch-card average-price-card">
        //         <div className="card text-white">
        //             <div className="card-body">
        //                 <div className="d-flex justify-content-between pb-2 align-items-center">
        //                     <h2 className="font-weight-semibold mb-0">{displayScore}/5</h2>
        //                 </div>
        //                 <div className="d-flex justify-content-between">
        //                     <h5 className="font-weight-semibold mb-0">Rating Score</h5>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        //     < div className="col-lg-12 grid-margin stretch-card" >
        //         <div className="card">
        //             <div className="card-body">
        //                 <h4 className="card-title">Reviews Received</h4>
        //                 <div className="table-responsive">
        //                     <table className="table table-striped">
        //                         <thead>
        //                             <tr>
        //                                 <th> User </th>
        //                                 <th> Business/Customer </th>
        //                                 <th> Score </th>
        //                                 <th> Review's Content </th>
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                             {receivedReviews.map((receivedReview, key) => {
        //                                 return (
        //                                     <tr key={key}>
        //                                         <td className="person">
        //                                             {receivedReview.fromPerson}
        //                                         </td>
        //                                         <td> {receivedReview.personType} </td>
        //                                         <td>
        //                                             <ProgressBar variant="success" now={20 * receivedReview.score} />
        //                                         </td>
        //                                         <td> {receivedReview.content} </td>
        //                                     </tr>
        //                                 )
        //                             })}
        //                         </tbody>
        //                     </table>
        //                 </div>
        //             </div>
        //         </div>
        //     </div >

        //     < div className="col-lg-12 grid-margin stretch-card" >

        //         <div className="card">
        //             <div className="card-body">
        //                 <h4 className="card-title">Reviews Given</h4>
        //                 <div className="table-responsive">
        //                     <table className="table table-striped">
        //                         <thead>
        //                             <tr>
        //                                 <th> User </th>
        //                                 <th> Business/Customer </th>
        //                                 <th> Rating </th>
        //                                 <th> Review's Content </th>
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                             {reviewGivens.map((reviewGiven, key) => {
        //                                 return (
        //                                     <tr key={key}>
        //                                         <td className="person">
        //                                             {reviewGiven.toPerson}
        //                                         </td>
        //                                         <td> {reviewGiven.personType} </td>
        //                                         <td>
        //                                             <ProgressBar variant="success" now={20 * reviewGiven.score} />
        //                                         </td>
        //                                         <td> {reviewGiven.content} </td>
        //                                     </tr>
        //                                 )
        //                             })}

        //                         </tbody>
        //                     </table>
        //                 </div>
        //             </div>
        //         </div>
        //     </div >
        // </div >

    )
}
