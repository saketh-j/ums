// Simulated API functions
export const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  };
  
  export const fetchUser = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await response.json();
    return data;
  };
  
  export const updateUser = async (id, userData) => {
    // Simulate API call to update user
    console.log('Updating user:', id, userData);
  };
  
  export const deleteUser = async (id) => {
    // Simulate API call to delete user
    console.log('Deleting user:', id);
  };
  
  export const createUser = async (userData) => {
    // Simulate API call to create user
    console.log('Creating user:', userData);
    // Simulate generating an ID for the new user
    const newUserId = Math.floor(Math.random() * 1000) + 10;
    return { ...userData, id: newUserId };
  };
  