import React, { Component } from 'react';
import '../stylesheets/PopularLinks.css';

class PopularLinks extends Component {
  constructor() {
    super();
    this.showList = this.showList.bind(this);
  }

  showList() {
    return (
      <div>
        <a href="https://www.facebook.com" target="_blank"><li>Facebook</li></a>
        <a href="https://www.twitter.com" target="_blank"><li>Twitter</li></a>
        <a href="https://www.github.com" target="_blank"><li>GitHub</li></a>
      </div>
    )
  }

  render() {
    return (
      <div className="main_PopularLinks">
        <h1>Popular Links</h1>
        <ul>
          {this.showList()}
        </ul>
        <br />
      </div>
    );
  }
}

export default PopularLinks;
