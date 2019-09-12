import React, { Component } from 'react';
import axios from 'axios';
import './stylesheets/Register.sass';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      password: null,
      password2: null,
      email: null,
      address: null,
      phone: null
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
      name = this.state.name,
      password = this.state.password,
      password2 = this.state.password2,
      email = this.state.email,
      address = this.state.address,
      phone = this.state.phone
    };

    console.log(name, password, password2, email, address, phone);

    this.setState({
      name: null,
      password: null,
      password2: null,
      email: null,
      address: null,
      phone: null,
    })
  };

  render() {

    return (
      <div>
          <form onSubmit={this.handleSubmit} className="form" id="contact">
            <div className="row form-row">
            <p className="required">* required</p>
              <br/>
            <div class="name-1">
              <label className="first-name">*First name</label>
              <input
              className="form-text"
              type="text"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleChange}/>
            </div>

            <div>
              <label className="last-name">*Last name</label>
              <input
              className="form-text"
              type="text"
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleChange}/>
            </div>

            <div>
              <label className="email">*Email</label>
              <input
                className="form-text"
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}/>
            </div>

            <div>
              <label className="subject">Subject</label>
              <input
              className="form-text"
              type="text"
              name="subject"
              value={this.state.subject}
              onChange={this.handleChange}/>
            </div>

            <div>
              <label className="message">*Message</label>
              <textarea
              className="form-text"
              name="message"
              value={this.state.message}
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