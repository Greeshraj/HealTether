import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./Form";
import Home from "./Home";
import LoginForm from "./LoginForm";
const App = () => {
  return (
    // <Router>
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path="/register" element={<Form />} />
        <Route path="/login" element={<LoginForm/>} />
      </Routes>
    // </Router>
  );
};

export default App;
