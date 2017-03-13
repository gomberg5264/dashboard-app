import React, { Component } from 'react';
import '../stylesheets/MainFocus.css';

class MainFocus extends Component {
  render() {
    return (
      <div>
        <div className="text-center main-focus">
          What is your main focus for today?
          &nbsp;
          <input className="main-focus-input text-center"
            placeholder="Type Here"
          />
        </div>
      </div>
    );
  }
}

export default MainFocus;
