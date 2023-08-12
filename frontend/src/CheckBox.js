import React, { useState } from 'react';
import './checkBox.css';

function CheckBox({ onCheckBoxToggle }) {
  const [showBackworks, setShowBackworks] = useState(false);

  const toggleBackworks = () => {
    setShowBackworks(!showBackworks);
    onCheckBoxToggle(!showBackworks);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={showBackworks}
          onChange={toggleBackworks}
        />
        Verified Backworks
      </label>

    </div>
  );
}

export default CheckBox;