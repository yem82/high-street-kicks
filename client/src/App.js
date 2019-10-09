import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './components/stylesheets/App.scss';
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Shoes from "./components/Shoes";


function App() {
  return (
    <Router>
      <Navbar/>
      <Route path="/" exact component={Shoes} />
      <Route path="/users/register" exact component={Register} />
      <Route path="/users/login" exact component={Login} />
    </Router>
  );
}

export default App;
