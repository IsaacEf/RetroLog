import React, { useState } from 'react'
import Validation from './SignupValidation'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
<<<<<<< Updated upstream
=======
import './login.css';

>>>>>>> Stashed changes

export default function SignUp() {
    const [values,setValues] = useState({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      err: false
    })
    const [visible, setVisible] = useState();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
      setValues({...values,[event.target.name]: event.target.value})
    }
    var response = 200
    const handleSubmit = (event) => {
      event.preventDefault();
      const validationErrors = Validation(values, response);
    
      // Check if there are any errors returned by the Validation function
      if (!validationErrors.err) {
        axios.post('http://localhost:8000/auth/register', {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          password: values.password
        })
        .then(response => {
          navigate('/sign-in')
        })
        .catch(err => {
          if (err.response) {
            // Assuming 'response' should be set to 400 in case of errors
            response = 400;
            setErrors(Validation(values, response));
          }
        });
      } else {
        // Update the errors state with the validation errors
        setErrors(validationErrors);
      }
    };
    return (
      /* might be bad that each field is under the same div classname you decide whats good */
      <form onSubmit={handleSubmit}>
        {/* Sign Up heading */}
        <h3>Sign Up</h3>

        {/* First Name Input */}
        <div className="mb-1">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name="firstname"
            onChange={handleInput}
          />
          {/* Display an error message if the firstname validation fails */}
          {errors.firstname && <span className='text-danger'>{errors.firstname}</span>}
        </div>

        {/* Last Name Input */}
        <div className="mb-2">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            name="lastname"
            onChange={handleInput}
          />
          {/* Display an error message if the lastname validation fails */}
          {errors.lastname && <span className='text-danger'>{errors.lastname}</span>}
        </div>

        {/* Email Address Input */}
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            onChange={handleInput}
          />
          {/* Display an error message if the email validation fails */}
          {errors.email && <span className='text-danger'>{errors.email}</span>}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label>Password</label>
          <input
            type={visible ? "text" : "password"}
            className="form-control"
            placeholder="Enter password"
            name="password"
            onChange={handleInput}
          />
          {/* Display an error message if the password validation fails */}
          {errors.password && <span className='text-danger'>{errors.password}</span>}
          {/* Show an eye icon to toggle password visibility */}
          <div className="p-2" onClick={() => setVisible(!visible)}>
            {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </div>
        </div>

        {/* Sign Up button */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>

        {/* Link to the Sign In page for users who are already registered */}
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }
export {SignUp}