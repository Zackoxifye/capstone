import React, { useState, useEffect } from "react";

const DropdownQty = ({ initialQuantity, onQuantityChange }) => {
  const [selectedQty, setSelectedQty] = useState(initialQuantity || "");

  const handleDropdownQty = (event) => {
    setSelectedQty(event.target.value);
    onQuantityChange(event.target.value);
  };

  return (
    <div>
      <label className="dropMenuCart">
        <select value={selectedQty} onChange={handleDropdownQty}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
        </select>
      </label>
    </div>
  );
};

export default DropdownQty;
