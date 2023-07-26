import React, { useState } from 'react'
import Validation from './LoginValidation'
import axios from 'axios'

export default function Login() {
    const [values,setValues] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
      setValues(prev => ({...prev,[event.target.name]: [event.target.value]}))
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      setErrors(Validation(values));
      axios.post('http://localhost:8000/auth/login', {values})
      .then(response => console.log(response))
      .catch(err => console.log(err))
    }

    return (
      <form action="" onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name = 'email'
            onChange={handleInput}/>
            {errors.email && <span className='text-danger'>{errors.email}</span>}
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name = 'password'
            onChange={handleInput}/>
            {errors.password && <span className='text-danger'>{errors.password}</span>}
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>


        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>

        <p className="sign-up text-left">
            <a href="/sign-up">Register/Signup</a>
        </p>

        <p className="forgot-password text-right">
          Forgot<a href=""> password?</a>
        </p>
      </form>
    )
  }