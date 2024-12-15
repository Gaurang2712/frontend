import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://backend-zlx0.onrender.com/insert', {name, description })
      .then(response => {
        console.log('User added:', response.data);
        alert('User added successfully!');
      })
      .catch(error => console.error('Error adding user:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="text" placeholder="Email" value={description} onChange={e => setDescription(e.target.value)} required />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
