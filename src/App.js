import React, { useState } from 'react';
import AddUser from './components/AddUser';
import UsersList from './components/UserList';
import express from 'express';
import pkg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const { Client } = pkg;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON data

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect().catch((err) => {
  console.error('Failed to connect to the database:', err);
  process.exit(1); // Exit if database connection fails
});

// Create table if it doesn't exist
const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      description TEXT
    );
  `;
  try {
    await client.query(query);
    console.log('Table "students" ensured.');
  } catch (err) {
    console.error('Error creating table:', err);
  }
};

// Insert data route
app.post('/insert', async (req, res) => {
  const { name, description } = req.body;

  const query = `INSERT INTO students (name, description) VALUES ($1, $2) RETURNING *;`;
  try {
    const result = await client.query(query, [name, description]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send('Failed to insert data');
  }
});

// Fetch data route
app.get('/data', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM students');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Database query failed');
  }
});

// Initialize database schema and data
(async () => {
  await createTable();
})();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUserAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div>
      <AddUser onUserAdded={handleUserAdded} />
      <UsersList key={refreshTrigger} />
    </div>
  );
}

export default App;
