import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Form, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { updateRecord } from '../utils/Utils';

export default function PersonalProfile() {
    const { currentUser } = useAuth();
    const [credentialParams, setCredentialParams] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [accountTypeValue, setAccountTypeValue] = useState('');
    const [aboutValue, setAboutValue] = useState('');
    const [avatar, setAvatar] = useState();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const aboutRef = useRef();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const accountTypes = [
        { id: 1, type: 'Business' },
        { id: 2, type: 'Customer' }
    ];

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
            setCurrentUserId(currentUserId);
        }

        loadUserInfo();

    }, []);

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        }
    }, [avatar]);

    async function onFileChange(file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            setCredentialParams(reader.result);
        }
    };

    async function onImgPreview(event) {

        const file = event.target.files[0];

        if (file) {
            file.preview = URL.createObjectURL(file);
            setAvatar(file)
        }
    };

    const handleSelect = (value) => {
        setAccountTypeValue(value)
    };

    async function updateInfo() {

        const credentialParamsJson = JSON.parse(credentialParams);

        const verifiedStatus = await axios({
            method: 'get',
            url: '/api/get_verified/' + credentialParamsJson["vc_jwt"],
        }).then((response) => {
            console.log(response.data);
            const verifiedStatus = response.data.status;
            return verifiedStatus;
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });

        console.log(verifiedStatus);
        if (verifiedStatus == "success") {
            try {
                setError('')
                const params = { table: "entity", id: currentUserId, name: nameRef.current.value, email: emailRef.current.value, password: passwordRef.current.value, type: accountTypeValue, about: aboutRef.current.value };
                updateRecord(params);
                setSuccess('Info updated successfully');
            } catch {
                setSuccess('');
                setError('Failed to update information');
            }
        }

    };

    return (
        <div className="col-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Profile Edit</h4>
                    <p className="card-description"> Edit your profile </p>
                    <form className="forms-sample"
                        onSubmit={(event) => {
                            event.preventDefault();
                            updateInfo();
                        }}>
                        {success && <Alert variant="success">{success}</Alert>}
                        {error && <Alert variant="danger">{error}</Alert>}
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

                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="inputAbout">About</label>
                            <textarea className="form-control" id="inputAbout" rows="4" ref={aboutRef} defaultValue={aboutValue}></textarea>
                        </Form.Group>
                        <Form.Group>
                            <label>Profile Picture</label>
                            <div className="profile-img-file">
                                <input type="file" onChange={onImgPreview} required />
                            </div>
                            <div id="picPreview">
                                {avatar && (<img src={avatar.preview} alt="" width={250} height={250} />)}
                            </div>
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
