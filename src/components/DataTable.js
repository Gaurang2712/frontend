import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataTable = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/data`);
      setData(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      alert('Failed to fetch data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h3>Data Table</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
