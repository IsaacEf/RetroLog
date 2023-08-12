import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Validation from './UploadValidation';
import './Upload.css';
import axios from 'axios';

export default function Upload( { selectedDepartment, CourseId }) {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    filename: '',
    professorid: '',
    file: null,
    err: false,
  });
  const [errors, setErrors] = useState({});
  const [professorData, setProfessorData] = useState([]);
  
  useEffect(() => {
    async function fetchProfessors() {
      const token = localStorage.getItem('jwtToken');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axios.post('http://localhost:8000/api/professors', {
          dept: selectedDepartment
        }, { headers });
        const data = response.data.professors;
        setProfessorData(data);
      } catch (error) {
        console.error('Error fetching professors: ', error);
      }
    }
    fetchProfessors();
  }, [selectedDepartment]);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setFormData({
      filename: '',
      professorid: '',
      file: null,
      err: false,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'professorid') {
      const selectedIndex = (parseInt(value)+1).toString(); // Convert the value to an integer
      setFormData({ ...formData, [name]: selectedIndex });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleFileDelete = () => {
    const fileInput = document.getElementById('file');
    if (fileInput) {
      fileInput.value = null;
    }
    setFormData({ ...formData, file: null });
  };

  var response = 200;
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(formData, response);

    if (!validationErrors.err) {
      const token = localStorage.getItem('jwtToken');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      };
      var formDataToSend = new FormData();
      formDataToSend.append('file', formData.file);
      var fname = formData.filename;
      var cid = CourseId.toString();
      var profid = formData.professorid;
      axios
        .post(
          `http://localhost:8000/api/upload?filename=${fname}&courseid=${cid}&professorid=${profid}`,
          formDataToSend,
          { headers }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          response = 400;
          setErrors(Validation(formData, response));
        });
      handleClosePopup();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <button onClick={handleOpenPopup}>Upload</button>
      <Modal
        isOpen={showPopup}
        onRequestClose={handleClosePopup}
        contentLabel="Form Modal"
        overlayClassName="modal-overlay"
        className="modal-content centered-content"
      >
        <div className="grey-box">
          <h2>Fill in the Form</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="filename">Filename:</label>
              <input
                type="text"
                id="filename"
                placeholder="Filename"
                name="filename"
                value={formData.filename}
                onChange={handleInputChange}
              />
              {errors.filename && <p className="error-message">{errors.filename}</p>}
            </div>
            <div>
              <label htmlFor="professor">Professor:</label>
              <select
                id="professor"
                name="professorid"
                onChange={handleInputChange}
              >
                <option value="">Select Professor</option>
                {professorData.map((professor,index) => (
                  <option key={professor.id} value={index}>
                    {professor.name}
                  </option>
                ))}
              </select>
              {errors.professorid && <p className="error-message">{errors.professorid}</p>}
            </div>
            <div>
              <label htmlFor="file">Select File (PDF or ZIP):</label>
              <input
                type="file"
                id="file"
                name="file"
                accept=".pdf,.zip"
                onChange={handleFileChange}
              />
              {errors.file && <p className="error-message">{errors.file}</p>}
            </div>
            {formData.file && (
              <div>
                <p>Selected File: {formData.file.name}</p>
                <button type="button" onClick={handleFileDelete}>
                  Delete File
                </button>
              </div>
            )}
            <button type="submit">Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
