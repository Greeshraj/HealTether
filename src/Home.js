import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; 
import { UseSelector, useSelector } from "react-redux";


const Home = () => {
  const userData = useSelector(state=>state.auth);
  console.log("we get userData",userData);
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-logo">Your Logo</div>
        <div className="nav-buttons">
          <Link to="/register" className="nav-button">
            Register
          </Link>
          <Link to="/login" className="nav-button">
            Login
          </Link>
        </div>
      </nav>

      <div className="main-content">
        {userData?(
          <div>
             <h1> Welcome User</h1>
          <p1>
            Your Email id is {userData.email}
          </p1>
          <br />
          <p1>
            Your Client id is {userData.clientId}
          </p1>
          <br />
       
          <p1>
            Your UserName is {userData.username}
          </p1>
          
          </div>
        ):
        (
          <div>
            <h1>Welcome to Your App</h1>
            <p>Explore our features and services.</p>
            <p>You are not logged in.</p>
          </div>
        )}
         
      </div>
    </div>
  );
};

export default Home;
