import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import useFetchCurrentId from '../utils/useFetchCurrentId';

export default function PersonalProfile() {
    const { currentUserId } = useFetchCurrentId();
    const [credentialParams, setCredentialParams] = useState();

    async function onFileChange(file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            setCredentialParams(reader.result);
        }
    }
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
                        <Form.Group>
                            <label htmlFor="selectType">Account Type</label>
                            <select className="form-control" id="selectType">
                                <option>Business</option>
                                <option>Customer</option>
                            </select>
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="exampleInputSummary">About</label>
                            <textarea className="form-control" id="exampleInputSummary" rows="4"></textarea>
                        </Form.Group>
                        <Form.Group>
                            <label>Credential Public Key</label>
                            <div className="custom-file">
                                <input type="file" onChange={event => onFileChange(event.target.files[0])} required />

                            </div>
                        </Form.Group>
                        <button type="submit" className="btn btn-primary mr-2">Submit</button>
                        <button className="btn btn-light">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
