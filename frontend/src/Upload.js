import React, { useState } from 'react';
import Modal from 'react-modal';
import Validation from './UploadValidation';
import './Upload.css';
import axios from 'axios';

export default function Upload() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    filename: '',
    professorid: '',
    file: null,
    err: false
  });
  const [errors, setErrors] = useState({});

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
    setFormData({ ...formData, [name]: value });
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
      var cid = '1';
      var profid = '1';
      axios.post(`http://localhost:8000/api/upload?filename=${fname}&courseid=${cid}&professorid=${profid}`, formDataToSend, { headers })
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
              <input
                type="text"
                id="professor"
                placeholder="Professor"
                name="professorid"
                value={formData.professorid}
                onChange={handleInputChange}
              />
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
};

export { Upload }
