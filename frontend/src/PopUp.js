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
            {props.somepop === "open" ?
            <Container>
                <form onSubmit={handleSubmit}>
                    <h1>Upload Form</h1>
                    <div className="ui divider"></div>
                        <div className="ui form">
                        <div className="field">
                            <label>Professor</label>
                            <input
                            type="text"
                            name="professorid"
                            placeholder="Professor"
                            onChange={handleInput}
                            />
                        </div>
                        <div className="field">
                            <label>Filename</label>
                            <input
                            type="text"
                            name="filename"
                            placeholder="Filename"
                            onChange={handleInput}
                            />
                        </div>
                        <button className="fluid ui button blue">Submit</button>
                    </div>
                </form>
            </Container>
            :
            ""}

        </>
    )
}

const Container = styled.div`
height: 400px;
width: 30%;
left: 50%;
top: 50%;
border-radius: 10px;
box-shadow: rgba(100,100,111,0.2) 0px;
-webkit-transform: translate(-50%,-50%);
transform: translate(-50%,-50%);
background-color: #fff;
position: absolute;
display: flex;
align-items: center;
justify-content: center;
`;

export default PopUp
