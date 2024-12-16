import React, { useState } from 'react'
import axios from 'axios'
import './mycss.css'

const AddUser = ({ onUserAdded }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post('https://backend-zlx0.onrender.com/insert', { name, description })
      .then(response => {
        console.log('User added:', response.data)
        alert('User added successfully!')
        // Clear the form
        setName('')
        setDescription('')
        // Trigger parent component refresh
        onUserAdded()
      })
      .catch(error => console.error('Error adding user:', error))
  }

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <button type="submit">Add User</button>
    </form>
  )
}

export default AddUser
