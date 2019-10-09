import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <div>
      <nav>
        <div>
        <ul>
          <li>
          <Link to="/" className="nav-link">All Shoes</Link>
          </li>
          <li>
          <Link to="/users">Sign Up</Link>
          </li>
        </ul>
        </div>
      </nav>
      </div>
    )
  }
}
