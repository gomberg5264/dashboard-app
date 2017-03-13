import React, { Component } from 'react';
import '../stylesheets/MainFocus.css';
import alertify from 'alertify.js';

class MainFocus extends Component {
  constructor() {
    super();
    this.state = {
      mainFocus: null
    }
    this.save = this.save.bind(this);
    this.mainFocusStatus = this.mainFocusStatus.bind(this);
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

  render() {
    return (
      <div>
        <div className="text-center main-focus">
          What is your main focus for today?
          &nbsp;
          {this.mainFocusStatus()}
        </div>
      </div>
    );
  }
}

export default MainFocus;
