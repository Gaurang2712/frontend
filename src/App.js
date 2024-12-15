import React from 'react';
import InsertData from './components/AddUser';
import DataTable from './components/UserList';

function App() {
  return (
    <div className="App">
      <h1>React with Node.js API</h1>
      <InsertData onInsert={() => window.location.reload()} />
      <DataTable />
    </div>
  );
}

export default App;
