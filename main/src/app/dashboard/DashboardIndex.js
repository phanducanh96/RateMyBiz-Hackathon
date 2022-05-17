import React from 'react'
import { Link } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import useFetchDataDashboard from '../utils/useFetchDataDashboard';

export default function DashboardIndex() {
    const { entityDatas } = useFetchDataDashboard();

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
                                        <th> Rating Score </th>
                                        <th> About </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entityDatas.map((entityData, key) => {
                                        return (
                                            <tr key={key}>
                                                <td className="entityName">
                                                    <Link to={
                                                        {
                                                            pathname: '/public-profile-view',
                                                            state: entityData.name
                                                        }}>{entityData.name}</Link>
                                                </td>
                                                <td>
                                                    <ProgressBar variant="success" now={20 * entityData.total_score} />
                                                </td>
                                                <td> {entityData.about} </td>
                                            </tr>
                                        )
                                    })}
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
