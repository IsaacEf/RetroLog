import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import './PopUp.css'

const PopUp = (props) => {
    const [val,setVal] = useState({
        filename: '',
        courseid: '',
        professorid: ''
    })

    const handleInput = (event) => {
        setValues({...val,[event.target.name]: event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault()
        const url = 'http://localhost:8000/api/upload' 
        const formData = new FormData()
        formData.append('filename',val.filename)
        formData.append('courseid','1')
        formData.append('professorid',val.professorid)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
        axios.post(url, formData, config)
            .then((response) => {
                console.log(response.data)
                setFileName(response.data.file)
            })
            .catch((error) => {
                console.error("Error uploading file: ", error)
            })
    }

    return (
        <>
          {/* Render the upload form if props.somepop is "open" */}
          {props.somepop === "open" ? (
            <Container>
              <form onSubmit={handleSubmit}>
                <h1>Upload Form</h1>
                <div className="ui divider"></div>
                <div className="ui form">
                  {/* Professor input field */}
                  <div className="field">
                    <label>Professor</label>
                    <input
                      type="text"
                      name="professorid"
                      placeholder="Professor"
                      onChange={handleInput}
                    />
                  </div>
                  {/* Filename input field */}
                  <div className="field">
                    <label>Filename</label>
                    <input
                      type="text"
                      name="filename"
                      placeholder="Filename"
                      onChange={handleInput}
                    />
                  </div>
                  {/* Submit button */}
                  <button className="fluid ui button blue">Submit</button>
                </div>
              </form>
            </Container>
          ) : (
            // If props.somepop is not "open", render nothing (empty fragment)
            ""
          )}
        </>
    );
}

export default PopUp
