/* eslint-disable */
import React, { Component } from 'react';
import '../stylesheets/MainFocus.css';
import alertify from 'alertify.js';
import {Popover, OverlayTrigger} from 'react-bootstrap';

class MainFocus extends Component {
  constructor() {
    super();
    this.state = {
      mainFocus: null
    }
    this.save = this.save.bind(this);
    this.mainFocusStatus = this.mainFocusStatus.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
  }

  componentDidMount() {
    var mainFocus = localStorage.getItem('main-focus');
    if (mainFocus) {
      this.setState({
        mainFocus: mainFocus
      })
    }
  }

  save(e) {
    if (e.key === 'Enter') {
      localStorage.setItem('main-focus', this.mainFocus.value )
      alertify.logPosition("top left");
      alertify.log('Main Focus: ' + this.mainFocus.value + ' saved!');
      // this.mainFocus.value = null;
    }
    this.componentDidMount();
  }

  mainFocusStatus() {
    if (this.state.mainFocus === null) {
      return (
        <input className="main-focus-input text-center"
            type="text"
            placeholder="Enter Here"
            ref={(input) => { this.mainFocus = input; }}
            onKeyPress={this.save}
        />
      )
    }
    else {
      return (
        <input
          className="main-focus-input text-center"
          type="text"
          placeholder={this.state.mainFocus}
          ref={(input) => { this.mainFocus = input; }}
          onKeyPress={this.save}
        />
      )
    }
  }

  moreInfo() {
    return (
      <Popover id="dashboard app" title="Dashboard">
        <p>
          This is a <strong>dashboard app</strong> that has widgets like latest news feed, current weather report,
          stock market data, calendar, dictionary, and a convenient collection of your daily favorite
          apps like Facebook, Twitter, Dropbox, etc.
        </p>
        <p>
          When you open your computer for the first time in the morning, this is the app you want
          to visit because all of your basic daily needs are conveniently put together all in one
          place - this dashboard.
        </p>
      </Popover>
    );
  }

  render() {
    return (
      <div>
        <div className="text-center main-focus">
          <span className="pull-left poweredBy">
            <OverlayTrigger placement="bottom" overlay={this.moreInfo()}>
              <span>About</span>
            </OverlayTrigger>
          </span>
          What is your main focus for today?
          &nbsp;
          {this.mainFocusStatus()}
        </div>
      </div>
    );
  }
}

export default MainFocus;
