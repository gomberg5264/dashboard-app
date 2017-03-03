import React, { Component } from 'react';
import { SocialIcon } from 'react-social-icons';
import { Button, Input, Modal, ButtonToolbar, Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import alertify from 'alertify.js';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showModalRegistration: false,
      loginOrLogout: 'Login'
    }
    this.showLoginPage = this.showLoginPage.bind(this);
    this.loginAuth = this.loginAuth.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.loginLogout = this.loginLogout.bind(this);
    this.loginAuth = this.loginAuth.bind(this);
    this.logout = this.logout.bind(this);
    this.showRegistrationPage = this.showRegistrationPage.bind(this);
    this.register = this.register.bind(this);
    this.showModalRegistration = this.showModalRegistration.bind(this);
    this.hideModalRegistration = this.hideModalRegistration.bind(this);
  }

  showModal(){
      this.setState({
        showModal: true,
      })
  }

  hideModal(){
    this.setState({
      showModal: false
    })
  }

  showLoginPage() {
    return (
            <Modal
              show={this.state.showModal}
              onHide={() => this.hideModal()}
              dialogClassName="custom-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-lg"><h3>Please Login</h3>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Username</h4>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  ref={(input) => { this.username = input; }}
                />
                <h4>Password</h4>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  ref={(input) => { this.password = input; }}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => this.hideModal()}>Cancel</Button>
                <Button bsStyle="primary"
                        onClick={() => this.loginAuth(this.username.value, this.password.value)}>
                  Login</Button>
              </Modal.Footer>
            </Modal>
        )
  }

  loginAuth(username, password) {
      axios.post('/auth/login', {
        username: username,
        password: password
      })
      .then((response) => {
        alertify.log('Login Successful!');
        this.setState({
          loginOrLogout: 'Logout'
        })
        this.hideModal();
        $('#registerButton').remove();

        // this.username.value = null;
        // this.password.value = null;
        // this.componentDidMount();
      })
      .catch((err) => { console.error(err); });
  }

  logout() {
    axios.get('/auth/logout')
    .then((response) => {
      alertify.log('Logout Successful!');
      alertify.alert("Please Refresh Page");
      this.setState({
        loginOrLogout: 'Login'
      })
    })
    .catch((err) => {console.log(err); })
  }

  loginLogout() {
    if (this.state.loginOrLogout === 'Login') {
      this.showModal();
    }
    else {
      this.logout();
    }
  }

  showModalRegistration(){
      this.setState({
        showModalRegistration: true,
      })
  }

  hideModalRegistration(){
    this.setState({
      showModalRegistration: false
    })
  }

  register() {
    this.showModalRegistration();
    axios.post('/auth/register', {
        username: this.regsiter_username.value,
        password: this.register_password.value,
        email: this.register_email.value
    })
    .then((response) => {
      alertify.log('Registration Successful!');
      this.hideModalRegistration();
      this.loginLogout();
    })
    .catch((err) => { console.error(err); });
    // this.loginLogout();
  }

  showRegistrationPage() {
    return (
            <Modal
              show={this.state.showModalRegistration}
              onHide={() => this.hideModalRegistration()}
              dialogClassName="custom-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-lg"><h3>Please Register</h3>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <label>Username:</label>
                  &nbsp;&nbsp;&nbsp;
                  <input type="text"
                    name="username"
                    placeholder="username is required"
                    ref={(input) => { this.regsiter_username = input; }}
                    required
                  />
                </div>
                <div>
                  <label>Password:</label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="password"
                    name="password"
                    placeholder="password is required"
                    ref={(input) => { this.register_password = input; }}
                    required
                  />
                </div>
                <div>
                  <label>Email:</label>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="text"
                    name="email"
                    placeholder="email is optional"
                    ref={(input) => { this.register_email = input; }}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => this.hideModalRegistration()}>Cancel</Button>
                <Button bsStyle="primary"
                        onClick={() => this.register()}>
                  Register</Button>
              </Modal.Footer>
            </Modal>
        )
  }

  render() {
    return (
      <div className="main_Login">
        <Button className="loginLogout" onClick={() => {this.loginLogout()}}>{this.state.loginOrLogout}</Button>
         &nbsp;&nbsp;
        <Button id="registerButton" onClick={() => {this.register()}}>Register</Button>
        {this.showLoginPage()}
        {this.showRegistrationPage()}
      </div>
    );
  }
}

export default Login;
