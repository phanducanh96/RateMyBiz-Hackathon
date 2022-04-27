import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';

export class BusinessProfile extends Component {
    state = {
        startDate: new Date()
    };

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    componentDidMount() {
        bsCustomFileInput.init()
    }

    render() {
        return (
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Business Profile Edit</h4>
                        <p className="card-description"> Edit your business profile </p>
                        <form className="forms-sample">
                            <Form.Group>
                                <label htmlFor="exampleInputName1">Business Name</label>
                                <Form.Control type="text" className="form-control" id="exampleInputName1" placeholder="Business Name" />
                            </Form.Group>
                            <Form.Group>
                                <label htmlFor="examplePhoneNumber">Phone Number</label>
                                <Form.Control type="PhoneNumber" className="form-control" id="examplePhoneNumber" placeholder="Phone Number" />
                            </Form.Group>
                            <Form.Group>
                                <label htmlFor="exampleInputAddress">Address</label>
                                <Form.Control type="Address" className="form-control" id="exampleInputAddress" placeholder="Address" />
                            </Form.Group>
                            <Form.Group>
                                <label htmlFor="exampleInputWebsite">Website</label>
                                <Form.Control type="text" className="form-control" id="exampleInputWebsite" placeholder="Website" />
                            </Form.Group>
                            <Form.Group>
                                <label>File upload</label>
                                <div className="custom-file">
                                    <Form.Control type="file" className="form-control visibility-hidden" id="customFileLang" lang="es" />
                                    <label className="custom-file-label" htmlFor="customFileLang">Upload image</label>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <label htmlFor="exampleInputSummary">Business Description</label>
                                <textarea className="form-control" id="exampleInputSummary" rows="4"></textarea>
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

export default BusinessProfile