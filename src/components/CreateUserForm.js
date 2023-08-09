import React, { useState } from 'react';

function CreateUserForm({ onCreateUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      phone: phone,
    };

    onCreateUser(newUser);
    if(newUser){
        alert("User created succesfully in the list")
    }

    // Clear form fields
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="create-user-form">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateUserForm;
