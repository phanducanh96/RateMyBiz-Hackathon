import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function Register() {
  const nameRef = useRef();
  const [accountTypeValue, setAccountTypeValue] = useState('Business');
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const accountTypes = [
    { id: 1, type: 'Business' },
    { id: 2, type: 'Customer' }
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match!');
    }

    const entityData = await axios({
      method: 'get',
      url: '/api/db_get_entity_by_name/',
      params: {
        name: nameRef.current.value
      }
    }).then((response) => {
      const entityData = response.data;
      return entityData;
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });

    if (entityData[0]) {
      return setError('Name is already in use');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      const params = { table: "entity", email: emailRef.current.value, password: passwordRef.current.value, name: nameRef.current.value, type: accountTypeValue, about: '', smart_contract: '', total_score: 0 };

      const entityResponse = await axios({
        method: 'post',
        url: '/api/db_create/',
        params: params
      }).then((response) => {
        console.log(response.data)
        return "success"
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          return "fail"
        }
      });

      if (entityResponse == "success") {

        const params2 = { table: "entityprofilepic" }
        const profilePicResponse = await axios({
          method: 'post',
          url: '/api/db_create/',
          params: params2
        }).then((response) => {
          console.log(response.data)
          return "success"
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            return "fail"
          }
        });

        if (profilePicResponse == "success") {
          history.push('/dashboard-index');
        } else {
          setError('Failed to create an account')
        }

      } else {
        setError('Failed to create an account')
      }


    } catch {
      setError('Failed to create an account')
    }

    setLoading(false)

  }

  const handleSelect = (value) => {
    setAccountTypeValue(value)
  };
  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={require("../../assets/images/logo.svg")} alt="logo" />
              </div>
              <h2 className="text-center mb-4">Sign Up</h2>
              <Form className="pt-3" onSubmit={handleSubmit}>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form.Group>
                  <Form.Control type="text" className="form-control" id="inputName" placeholder="Name" ref={nameRef} required />
                </Form.Group>

                <Form.Group>
                  <select className="form-control" id="SelectAccountType" value={accountTypeValue} onChange={event => handleSelect(event.target.value)}>
                    {accountTypes.map((accountType, key) => {
                      return (
                        <option key={accountType.id} value={accountType.type}>Type: {accountType.type}</option>
                      )
                    })}
                  </select>

                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Control type="email" className="form-control form-control-lg" id="InputEmail" placeholder="Email" ref={emailRef} required />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Control type="password" className="form-control form-control-lg" id="InputPassword" placeholder="Password" ref={passwordRef} required />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Control type="password" className="form-control form-control-lg" id="InputConfirmPassword" placeholder="Cofirm Password" ref={passwordConfirmRef} required />
                </Form.Group>

                <div className="mb-4">
                  <Form.Group className="form-check">

                    <Form.Label className="form-check-label text-muted">
                      <Form.Control type="checkbox" className="form-check-input" required />
                      <i className="input-helper"></i>
                      I agree to all Terms & Conditions
                    </Form.Label>

                  </Form.Group>
                </div>
                <div className="mt-3">
                  <Button disabled={loading} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit">SIGN UP</Button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Already have an account? <Link to="/login" className="text-primary">Login</Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

