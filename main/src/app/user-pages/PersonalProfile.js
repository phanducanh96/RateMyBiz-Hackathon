import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import '../utils/Utils'

export class PersonalProfile extends Component {
    state = {
        startDate: new Date()
    };

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    render() {
        return (
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Profile Edit</h4>
                        <p className="card-description"> Edit your profile </p>
                        <form className="forms-sample">
                            <Form.Group>
                                <label htmlFor="exampleInputName1">Name</label>
                                <Form.Control type="text" className="form-control" id="exampleInputName1" placeholder="Name" />
                            </Form.Group>
                            <Form.Group>
                                <label htmlFor="exampleInputEmail">Email</label>
                                <Form.Control type="text" className="form-control" id="exampleInputEmail" placeholder="Email" />
                            </Form.Group>
                            <Form.Group>
                                <label htmlFor="examplePassword">Password</label>
                                <Form.Control type="Password" className="form-control" id="examplePassword" placeholder="Password" />
                            </Form.Group>

                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                            <button className="btn btn-light">Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default PersonalProfile