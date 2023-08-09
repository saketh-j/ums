import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { fetchUser, updateUser, deleteUser } from '../api';
import Skeleton from 'react-loading-skeleton'; 

const UserDetails = ({ users, setUsers }) => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    fetchUser(id)
      .then(data => {
        setUser(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setIsLoading(false);
      });
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateUser(id, user);
      setIsEditing(false);

      // Update the user in the list
      const updatedUsers = users.map(u => (u.id === parseInt(id) ? user : u));
      setUsers(updatedUsers);
      if(updatedUsers){
        alert("updated succesfully")
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(id);

      // Remove the user from the list
      const updatedUsers = users.filter(u => u.id !== parseInt(id));
      setUsers(updatedUsers);
      setIsDeleted(true);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (isDeleted) {
    return <Navigate to="/" />;
  }

  return (
    <div className="user-details">
      <h1>User Details</h1>
      {isLoading ? (
       <div className="loading-skeleton">
       <div className="skeleton-row"></div>
       <div className="skeleton-row"></div>
       <div className="skeleton-row"></div>
     </div>
      ) : (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          {isEditing ? (
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
              />
              <button onClick={handleUpdate}>Save</button>
            </div>
          ) : (
            <div>
              <button onClick={handleEditToggle}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
              <Link to="/" className="back-link">Back to List</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
