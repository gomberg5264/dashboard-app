import React, { Component } from 'react';
import '../stylesheets/Postit.css';
import axios from 'axios';
import {Button, Glyphicon, Popover, OverlayTrigger} from 'react-bootstrap';
import alertify from 'alertify.js';
import gmail_icon from '../images/gmail-icon.png';

class Postit extends Component {
  constructor() {
    super();
    this.moreInfo = this.moreInfo.bind(this);
  }

moreInfo() {
    return (
      <Popover className="aboutNewsWidget" title="About 'Weather'">
        <p>
          This widget gives you the current weather and short summary.
          You can just enter your zipcode and press Enter.
        </p>
        <p>
          This widget is powered by Open Weather API.
        </p>
      </Popover>
    );
  }

  render() {
    return (
      <div className="main_Postit text-center">
        <h2 className="pull-left">
          <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo()}>
            <i className="fa fa-info-circle moreInfoBtn" aria-hidden="true"></i>
          </OverlayTrigger>
          &nbsp;
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
