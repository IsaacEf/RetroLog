import React from 'react';

function Class({ data, onBack }) {
  // Group backwork by type
  const backworkByType = data.backwork.reduce((grouped, work) => {
    if (!grouped[work.type]) {
      grouped[work.type] = [];
    }
    grouped[work.type].push(work.name);
    return grouped;
  }, {});

  return (
    <div>
      <button onClick={onBack}>Go Back</button>
      <h2>{data.name}</h2>
      {Object.entries(backworkByType).map(([type, works]) => (
        <div key={type}>
          <h3>{type}</h3>
          <ul>
            {works.map((work, i) => (
              <li key={i}>{work}</li>
            ))}
          </ul>
        </div>
      ))}
      <button>Upload Work</button>
    </div>
  );
}

export default Class;
