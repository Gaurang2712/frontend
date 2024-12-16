import React, { useState } from 'react';
import AddUser from './components/AddUser';
import UsersList from './components/UserList';

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
