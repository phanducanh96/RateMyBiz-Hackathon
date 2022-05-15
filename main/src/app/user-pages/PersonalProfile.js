import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'

export default function PersonalProfile() {
    // const { currentUserId } = useFetchCurrentId();
    const { currentUser } = useAuth();
    const [credentialParams, setCredentialParams] = useState();
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [accountTypeValue, setAccountTypeValue] = useState('');
    const [aboutValue, setAboutValue] = useState('');
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const aboutRef = useRef();

    const accountTypes = [
        { id: 1, type: 'Business' },
        { id: 2, type: 'Customer' }
    ]

    useEffect(() => {

        const loadUserInfo = async () => {
            const currentUserId = await axios({
                method: 'get',
                url: '/api/db_get_by_email/',
                params: { 'email': currentUser.email },
            }).then((response) => {
                console.log(response.data);
                return (response.data[0]);
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });

            const entityData =
                await axios({
                    method: 'get',
                    url: '/api/db_get/',
                    params: {
                        table: 'entity',
                        id: currentUserId
                    }
                }).then((response) => {
                    console.log(response.data)
                    return response.data;
                    // Display data
                }).catch((error) => {
                    if (error.response) {
                        console.log(error.response)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                    }
                });
            setAccountTypeValue(entityData.type);
            setNameValue(entityData.name);
            setEmailValue(entityData.email);
            setPasswordValue(entityData.password);
            setAboutValue(entityData.about);
        }

        loadUserInfo();

    }, [])

    async function onFileChange(file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            setCredentialParams(reader.result);
        }
    }

    const handleSelect = (value) => {
        setAccountTypeValue(value)
    }

    console.log(accountTypeValue);
    return (
        <div className="col-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Profile Edit</h4>
                    <p className="card-description"> Edit your profile </p>
                    <form className="forms-sample">
                        <Form.Group>
                            <label htmlFor="exampleInputName1">Name</label>
                            <Form.Control type="text" className="form-control" id="inputName" placeholder="Name" ref={nameRef} defaultValue={nameValue} />
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="exampleInputEmail">Email</label>
                            <Form.Control type="text" className="form-control" id="inputEmail" placeholder="Email" ref={emailRef} defaultValue={emailValue} />
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="examplePassword">Password</label>
                            <Form.Control type="Password" className="form-control" id="inputPassword" placeholder="Password" ref={passwordRef} defaultValue={passwordValue} />
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="selectType">Account Type</label>
                            <select className="form-control" id="SelectAccountType" value={accountTypeValue} onChange={event => handleSelect(event.target.value)}>
                                {accountTypes.map((accountType, key) => {
                                    return (
                                        <option key={accountType.id} value={accountType.type}>{accountType.type}</option>
                                    )
                                })}
                            </select>

                            {/* {accountTypes.map((accountType, key) => {
                                return (
                                    <div className="form-check" key={accountType.id}>
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="accountTypeRadios" value="{accountType.type}" ref={accountTypeRef} checked={accountType.type === accountTypeValue} onChange={() => handleCheck(accountTypeRef)} />
                                            <i className="input-helper"></i>
                                            {accountType.type}
                                        </label>
                                    </div>
                                )
                            })} */}
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="inputAbout">About</label>
                            <textarea className="form-control" id="inputAbout" rows="4" ref={aboutRef} defaultValue={aboutValue}></textarea>
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
        </div >
    )
}
