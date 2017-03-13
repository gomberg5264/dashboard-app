import React, { Component } from 'react';
import '../stylesheets/MainFocus.css';

class MainFocus extends Component {
  constructor() {
    super();
    this.state = {
      mainFocus: null
    }
    this.save = this.save.bind(this);
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
      this.mainFocus.value = null;
    }
    this.componentDidMount();
  }

  render() {

    return (
      <div>
        <div className="text-center main-focus">
          What is your main focus for today?
          &nbsp;
          <input className="main-focus-input text-center"
            type="text"
            placeholder="Type Here"
            value={this.state.mainFocus}
            ref={(input) => { this.mainFocus = input; }}
            onKeyPress={this.save}
          />
        </div>
      </div>
    );
  }
}

export default MainFocus;
