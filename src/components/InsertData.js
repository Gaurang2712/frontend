import React, { useState } from 'react';
import axios from 'axios';

const InsertData = ({ onInsert }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/insert`, { name, description });
      if (response.status === 200) {
        alert('Data inserted successfully!');
        onInsert(); // Refresh the data table
        setName('');
        setDescription('');
      }
    } catch (err) {
      console.error('Error inserting data:', err);
      alert('Failed to insert data.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Insert Data</h3>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description: </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InsertData;
