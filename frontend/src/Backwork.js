import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BackworkList = () => {
  const [backworks, setBackworks] = useState([]);
  const jwt = localStorage.getItem('jwtToken');  // Replace with the actual JWT.
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
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
          data: {
            courseid: 1,  // Use actual course ID here.
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

  return (
    <ul>
      {backworks.map((backwork) => (
        <li key={backwork.uuid}>
          <h2>{backwork.fileName}</h2>
          <a href={backwork.url} target="_blank" rel="noopener noreferrer">
            Download file
          </a>
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
