import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './components/stylesheets/App.sass';
import Navbar from "./components/Navbar";
import CreateUser from "./components/Register";
import ShoeList from "./components/Shoes";


function App() {
  return (
    <Router>
      <Navbar/>
      <Route path="/" exact component={ShoeList} />
      <Route path="/users" exact component={CreateUser} />
    </Router>
  );
}

export default App;
