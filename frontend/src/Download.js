import React, { useState } from 'react';
import axios from 'axios'
import Validation from './DownloadValidation';

export default function Download()  {
  const [Data, setData] = useState({
    courseid: '',
    professorid: '',
    verified: false,
    err: false
  });
  const [errors, setErrors] = useState({})


  var response = 200
  const handleBackworks = (event) => {
    event.preventDefault();

    if (!validationErrors.err) {
        // Set the Authorization header with the JWT token
        const token = localStorage.getItem('jwtToken');
        const headers = {
          Authorization: `Bearer ${token}`
        };

        // Make the Axios POST request with the form data and headers
        axios.get("localhost:8000/api/backworks",
        { 
            courseid: Data.courseid,
            professorid: Data.professorid,
            verified: Data.verified
        }, { headers })
          .then((response) => {
            // Handle the response
            console.log(response);
          })
          .catch((err) => {
            // Handle the error
            response = 400;
            setErrors(Validation(Data,response));
          });
      } else {
        // Update the errors state with the validation errors
        setErrors(validationErrors);
      }
  };

  
};

export { Download }
