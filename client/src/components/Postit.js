import React, { Component } from 'react';
import '../stylesheets/Postit.css';
import axios from 'axios';
import {Button, Glyphicon, Popover, OverlayTrigger} from 'react-bootstrap';
import alertify from 'alertify.js';
import gmail_icon from '../images/gmail-icon.png';

class Postit extends Component {

  render() {
    return (
      <div className="main_Postit text-center">
        <h2 className="pull-left">
          Gmail
        </h2>
        <span className="pull-right">
          <button type="button" className="login-gmail pull-left">
            Login&nbsp;<img className="gmail-icon pull-right" src={gmail_icon} width="30px" height="30px" />
          </button>
        </span>
    </div>
    );
  }
}

export default Postit;
