import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/actions/authActions';
import axios from 'axios';
 

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/login', formData);
      console.log('Login successful:', response.data.message);
      alert('Login successful');
      console.log("we are at loign page",response.data)
      dispatch(setUserData(response.data));
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
      
        const validationErrors = error.response.data.errors.map((error) => error.msg);
        setErrors(validationErrors);

       
        if (validationErrors.length > 0) {
          alert(validationErrors[0]);
        }
      } else {
        
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {errors.length > 0 && (
        <div>
          <h3>Validation Errors:</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginForm;
