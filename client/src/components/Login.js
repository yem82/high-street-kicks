import React, { Component } from 'react';
import axios from 'axios';
import './stylesheets/Login.scss';

class Register extends Component {
  state = {
    email: '',
    password: ''
  };

  componentDidMount() {
    
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.setState({
      email: '',
      password: '',
    })
  };

  render() {

    return (
      <div>
          <form onSubmit={this.handleSubmit} className="form" id="login">
            <div className="row form-row">
            <div>
              <label className="email">Email:</label>
              <input
                className="form-text"
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}/>
            </div>

            <div>
              <label className="password">Password:</label>
              <input
                className="form-text"
                type="text"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}/>
            </div>
            <button type="submit">Submit</button>
            </div>
            </form>
      </div>
    );
  }
}

export default Register;