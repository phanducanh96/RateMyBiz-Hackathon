import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import '../utils/Utils'

export class DashboardIndex extends Component {
    render() {
        return (
            <div>
                <div className="row page-title-header">
                    <div className="col-12">
                        <div className="page-header">
                            <h4 className="page-title">Rate My Biz Dashboard</h4>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Businesses Rating Board</h4>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th> User </th>
                                            <th> First name </th>
                                            <th> Progress </th>
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
                                                <ProgressBar variant="success" now={25} />
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
                                                <ProgressBar variant="danger" now={75} />
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
                </div>

                <div className="row">
                    <div className="col-md-4 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between pb-3">
                                    <h4 className="card-title mb-0">Activities</h4>
                                    <p className="mb-0 text-muted">20 finished, 5 remaining</p>
                                </div>
                                <ul className="timeline">
                                    <li className="timeline-item">
                                        <p className="timeline-content"><a href="!#" onClick={evt => evt.preventDefault()}>Ben Tossell</a> assign you a task</p>
                                        <p className="event-time">Just now</p>
                                    </li>
                                    <li className="timeline-item">
                                        <p className="timeline-content"><a href="!#" onClick={evt => evt.preventDefault()}>Ben Tossell</a> assign you a task</p>
                                        <p className="event-time">Just now</p>
                                    </li>
                                    <li className="timeline-item">
                                        <p className="timeline-content"><a href="!#" onClick={evt => evt.preventDefault()}>Ben Tossell</a> assign you a task</p>
                                        <p className="event-time">Just now</p>
                                    </li>
                                    <li className="timeline-item">
                                        <p className="timeline-content"><a href="!#" onClick={evt => evt.preventDefault()}>Ben Tossell</a> assign you a task</p>
                                        <p className="event-time">Just now</p>
                                    </li>
                                    <li className="timeline-item">
                                        <p className="timeline-content"><a href="!#" onClick={evt => evt.preventDefault()}>Ben Tossell</a> assign you a task</p>
                                        <p className="event-time">Just now</p>
                                    </li>
                                </ul>
                                <a className="d-block mt-3" href="!#" onClick={evt => evt.preventDefault()}>Show all</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-0">Top Performer</h4>
                                <div className="d-flex mt-3 py-2 border-bottom">
                                    <img className="img-sm rounded-circle" src={require("../../assets/images/faces/face3.jpg")} alt="profile" />
                                    <div className="wrapper ml-2">
                                        <p className="mb-n1 font-weight-semibold">Ray Douglas</p>
                                        <small>162543</small>
                                    </div>
                                    <small className="text-muted ml-auto">1 Hours ago</small>
                                </div>
                                <div className="d-flex py-2 border-bottom">
                                    <span className="img-sm rounded-circle bg-warning text-white text-avatar">OH</span>
                                    <div className="wrapper ml-2">
                                        <p className="mb-n1 font-weight-semibold">Ora Hill</p>
                                        <small>162543</small>
                                    </div>
                                    <small className="text-muted ml-auto">4 Hours ago</small>
                                </div>
                                <div className="d-flex py-2 border-bottom">
                                    <img className="img-sm rounded-circle" src={require("../../assets/images/faces/face4.jpg")} alt="profile" />
                                    <div className="wrapper ml-2">
                                        <p className="mb-n1 font-weight-semibold">Brian Dean</p>
                                        <small>162543</small>
                                    </div>
                                    <small className="text-muted ml-auto">4 Hours ago</small>
                                </div>
                                <div className="d-flex pt-2">
                                    <span className="img-sm rounded-circle bg-success text-white text-avatar">OB</span>
                                    <div className="wrapper ml-2">
                                        <p className="mb-n1 font-weight-semibold">Olive Bridges</p>
                                        <small>162543</small>
                                    </div>
                                    <small className="text-muted ml-auto">7 Hours ago</small>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default DashboardIndex