import React from 'react';
import InsertData from './components/InsertData';
import DataTable from './components/DataTable';

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
