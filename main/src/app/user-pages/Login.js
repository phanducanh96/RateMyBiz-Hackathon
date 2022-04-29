import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import '../utils/Utils'
import { getCurrentId } from '../utils/Utils'

export default function LogIn() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      global.currentUserGlobal = emailRef.current.value
      getCurrentId(emailRef.current.value)
      history.push('/dashboard-index')
    } catch {
      setError('Failed to Sign In')
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
              <h2 className="text-center mb-4">Log In</h2>
              <Form className="pt-3" onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group className="form-group">
                  <Form.Control type="email" className="form-control form-control-lg" id="InputEmail" placeholder="Email" ref={emailRef} required />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Control type="password" className="form-control form-control-lg" id="InputPassword" placeholder="Password" ref={passwordRef} required />
                </Form.Group>

                <div className="mt-3">
                  <Button disabled={loading} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit">LOG IN</Button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                      <i className="input-helper"></i>
                      Keep me signed in
                    </label>
                  </div>
                  <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-black">Forgot password?</a>
                </div>

                {/* <div className="mb-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                    </button>
                  </div> */}

                <div className="text-center mt-4 font-weight-light">
                  Don't have an account? <Link to="/signup" className="text-primary">Sign Up</Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
