import React, { Component } from 'react';
import axios from 'axios';
import './stylesheets/Register.scss';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      address: '',
      phone: ''
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      address: this.state.address,
      phone: this.state.phone
    };

    console.log(user)

    axios.post('/users/register', user)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form" id="registration">
          <div className="row form-row">
          <div>
            <label className="name">Name</label>
            <input
            className="form-text"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}/>
          </div>

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

          <div>
            <label className="password2">Re-enter password:</label>
            <input
              className="form-text"
              type="text"
              name="password2"
              value={this.state.password2}
              onChange={this.handleChange}/>
          </div>

          <div>
            <label className="address">Address:</label>
            <textarea
            className="form-text"
            type="text"
            name="address"
            value={this.state.address}
            onChange={this.handleChange}/>
          </div>

          <div>
            <label className="phone">Phone:</label>
            <input
            className="form-text"
            name="phone"
            value={this.state.phone}
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