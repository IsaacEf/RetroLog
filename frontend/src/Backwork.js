import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BackworkList = () => {
  const [backworks, setBackworks] = useState([]);
  const jwt = localStorage.getItem('jwtToken');
  const headers = {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: 'http://localhost:8000/api/backworks',
          headers,
          data: {
            courseid: 1,
            professorid: null,
            verified: false,
          },
        });

        setBackworks(response.data.backworks);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleDownload = async (url, filename) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ul>
      {backworks.map((backwork) => (
        <li key={backwork.uuid}>
          <h2>{backwork.fileName}</h2>
          <button onClick={() => handleDownload(backwork.url, backwork.fileName)}>
            Download file
          </button>
          <p>Course ID: {backwork.courseId}</p>
          <p>Professor ID: {backwork.professorId}</p>
          <p>Verified: {backwork.verified ? 'Yes' : 'No'}</p>
          <p>User ID: {backwork.userId}</p>
        </li>
      ))}
    </ul>
  );
};

export default BackworkList;