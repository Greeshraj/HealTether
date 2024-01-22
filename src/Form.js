import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/actions/authActions';
import axios from 'axios';
 

const Form = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
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
      const response = await axios.post("http://localhost:3001/api/register", formData);
      console.log("Registration successful:", response.data.message);
      alert("Registration successful")
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
     
        console.error("Registration failed:", error);
      }
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      
<form onSubmit={handleSubmit}>
<label>
  Username:
  <input
    type="text"
    name="username"
    value={formData.username}
    onChange={handleChange}
  />
</label>
<br />
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
<button type="submit">Submit</button>
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
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Form;



