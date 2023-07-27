import React, { useState } from 'react'
import Validation from './SignupValidation'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function SignUp() {
    const [values,setValues] = useState({
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
      setValues({...values,[event.target.name]: event.target.value})
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      setErrors(Validation(values));
      axios.post('http://localhost:8000/auth/register', {
        firstname:values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password
      })
      .then(response => {
        navigate('/sign-in')
      })
      .catch(err => console.log(err))
    }
    return (
      <form action = "/sign-in" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name = 'firstname'
            onChange={handleInput}/>
            {errors.firstname && <span className='text-danger'>{errors.firstname}</span>}
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input type="text" 
          className="form-control" 
          placeholder="Last name"
          name = 'lastname'
          onChange={handleInput} />
          {errors.lastname && <span className='text-danger'>{errors.lastname}</span>}
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name = 'email'
            onChange={handleInput} />
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

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }