import React, { useState } from 'react'
import Validation from './SignupValidation'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

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
      <form onSubmit={handleSubmit}>
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
            type= {visible ? "text" : "password"}
            className="form-control"
            placeholder="Enter password"
            name = 'password'
            onChange={handleInput}/>
            <div className = "p-2" onClick={() => setVisible(!visible)}>
              {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </div>
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
export {SignUp}