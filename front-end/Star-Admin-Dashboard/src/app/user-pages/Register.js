import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Alert} from 'react-bootstrap'
import  { useAuth }  from '../contexts/AuthContext'

export default function Register() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
      e.preventDefault()

      if (passwordRef.current.value !== passwordConfirmRef.current.value){
        return setError('Passwords do not match!')
      }

      try{
        setError('')
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
        history.push('/dashboard')
      } catch {
        setError('Failed to create an account')
      }

      setLoading(false)
      
    }

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
                <Form.Group className="form-group">
                    <Form.Control type="email" className="form-control form-control-lg" id="InputEmail" placeholder="Email" ref={emailRef} required/>
                </Form.Group>

                  {/* <Form.Group className="form-group">
                    <Form.Control type="text" className="form-control form-control-lg" id="InputUserName" placeholder="Username"  ref={userNameRef} required/>
                  </Form.Group> */}

                  {/* <div className="form-group">
                    <select className="form-control form-control-lg" id="exampleFormControlSelect2">
                      <option>Country</option>
                      <option>United States of America</option>
                      <option>United Kingdom</option>
                      <option>India</option>
                      <option>Germany</option>
                      <option>Argentina</option>
                    </select>
                  </div> */}

                  <Form.Group className="form-group">
                    <Form.Control type="password" className="form-control form-control-lg" id="InputPassword" placeholder="Password" ref={passwordRef} required/>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Control type="password" className="form-control form-control-lg" id="InputConfirmPassword" placeholder="Cofirm Password" ref={passwordConfirmRef} required/>
                  </Form.Group>

                  <div className="mb-4">
                    <Form.Group className="form-check">

                      <Form.Label className="form-check-label text-muted">
                        <Form.Control type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        I agree to all Terms & Conditions
                      </Form.Label>
                    
                    </Form.Group>
                  </div>
                  <div className="mt-3">
                    <Button disabled={loading} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit">SIGN UP</Button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account? <Link to="/user-pages/login-1" className="text-primary">Login</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

