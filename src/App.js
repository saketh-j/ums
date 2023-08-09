import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import './App.css';
import { fetchUsers, createUser } from './api'; // Update the import path as needed
import CreateUserForm from './components/CreateUserForm'; // Import the CreateUserForm component
import Navbar from './components/Navbar';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleCreateUser = async newUser => {
    try {
      // Simulate API call to create user
      const response = await createUser(newUser);

      // Update the user list
      setUsers(prevUsers => [...prevUsers, response]);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <br />
        <center className='title'> User Management Application</center>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <CreateUserForm onCreateUser={handleCreateUser} />
                <br />
                <UserList users={users} />
              </div>
            }
          />
          <Route
            path="/user/:id"
            element={<UserDetails users={users} setUsers={setUsers} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
