import React from 'react';
import { useParams } from 'react-router-dom';

function ClassWork() {
  let { classId } = useParams();
  
  return (
    <div>
      <h1>Class Work for class: {classId}</h1>
    </div>
  );
}

export default ClassWork;
