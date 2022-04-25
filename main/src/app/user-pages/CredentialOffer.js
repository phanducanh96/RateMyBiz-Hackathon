import React, { Component } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';

class CredentialOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jwt_string: '',
        }
    }

    makeCredentialJson = () => {

        if (this.state.jwt_string != '') {
            const verifier_params = {
                host_port: "verifier-sandbox.circle.com",
                did: "did:key:zQ3shv378PvkMuRrYMGFV9a3MtKpJkteqb2dUbQMEMvtWc2tE",
                vc_jwt: this.state.jwt_string
            }
            const verifier_params_JSON = JSON.stringify(verifier_params)
            const fileName = "verifier_params"
            const blob = new Blob([verifier_params_JSON], { type: 'application/json' });
            const href = URL.createObjectURL(blob);
            return (
                <div>
                    <h4 className="card-title">Successfully Verified from Issuer</h4>
                    <a type="submit" className="btn btn-primary mr-2" href={href} download={fileName + ".json"}>Click to download Verifier Credential</a>
                </div>
            );
        } else {
            return (
                <h4 className="card-title"></h4>
            );
        }
    };

    render() {

        return (

            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Getting Issuer Public Key</h4>

                        <form className="forms-sample" onSubmit={(event) => {
                            event.preventDefault()
                            this.getCredentialOffer()
                        }}>
                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                        </form>
                        {this.makeCredentialJson()}
                    </div>
                </div>
            </div >
        )
    }

    getCredentialOffer = () => {

        axios({
            method: 'get',
            url: '/api/issuer/',
        }).then((response) => {
            console.log(response.data)
            this.setState({ jwt_string: response.data })
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        });

    }
}

export default CredentialOffer;