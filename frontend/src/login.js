import React, { useState } from 'react'
import Validation from './LoginValidation'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import './index.css';

export default function Login() {
    const [values,setValues] = useState({
        email: '',
        password: ''
    })
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
      setValues({...values,[event.target.name]: event.target.value})
    }
    var response = 200
    const handleSubmit = (event) => {
      event.preventDefault();
      setErrors(Validation(values,response));
      axios.post('http://localhost:8000/auth/login', {
        email: values.email,
        password: values.password
      })
      .then(response => {
        localStorage.setItem('jwtToken', response.data.jwt);
        console.log("Token:" + response.data.jwt)
        navigate('/Home')
      })
      .catch(err => {
        if (err.response) {
          response = 400;
          setErrors(Validation(values,response));
        }
      })
    }

    return (
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        {/* decided to make the div names for each field unique for login, forgot why */}

        {/* Email input field */}
        <div className="mb-1">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            onChange={handleInput}
          />
          {errors.email && <span className='text-danger'>{errors.email}</span>}
        </div>
    
        {/* Password input field */}
        <div className="mb-2">
          <label>Password</label>
          <input
            type={visible ? "text" : "password"}
            className="form-control"
            placeholder="Enter password"
            name="password"
            onChange={handleInput}
          />
          {/* Icon to toggle password visibility */}
          <div className="p-2" onClick={() => setVisible(!visible)}>
            {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </div>
          {errors.password && <span className='text-danger'>{errors.password}</span>}
        </div>
    
        {/* Remember me checkbox */}
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
    
         {/* Login button */}
    <div className="d-grid">
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </div>

    {/* Register and Forgot password links */}
    <div className="links-container text-left">
      <a href="/sign-up" className="register-link">Register/Signup</a>
      <a href="" className="forgot-password-link">Forgot password?</a>
    </div>
  </form>
    );    
  }
export {Login}