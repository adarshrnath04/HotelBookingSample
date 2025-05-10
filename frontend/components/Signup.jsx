import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

function Signup() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    username: '',
    password: '',
    dob: '',
    sslc_marks: '',
    hsc_marks: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/api/signup', form);
      alert('Signup successful!');
    } catch {
      alert('Signup failed!');
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <input type="text" name="full_name" placeholder="Full Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="text" name="username" placeholder="Username" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} />
      <input type="number" name="sslc_marks" placeholder="SSLC Marks (%)" onChange={handleChange} />
      <input type="number" name="hsc_marks" placeholder="12th Marks (%) (Optional)" onChange={handleChange} />
      <button onClick={handleSignup}>Sign Up</button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}

export default Signup;
