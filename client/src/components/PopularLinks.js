import React, { Component } from 'react';
import '../stylesheets/PopularLinks.css';
import { SocialIcon } from 'react-social-icons';

class PopularLinks extends Component {
  constructor() {
    super();
    this.showList = this.showList.bind(this);
  }

  showList() {
    return (
      <div className="align-center">
        <li>
            <SocialIcon url="http://facebook.com" />
            &nbsp;<SocialIcon url="http://twitter.com" />
            &nbsp;<SocialIcon url="http://youtube.com" />
        </li>
        <br />
        <li>
            <SocialIcon url="http://dropbox.com" />
            &nbsp;<SocialIcon url="http://github.com" />
            &nbsp;<SocialIcon url="https://plus.google.com" />
        </li>
        <br />
        <li>
            <SocialIcon url="http://pinterest.com" />
            &nbsp;<SocialIcon url="http://linkedin.com" />
            &nbsp;<SocialIcon url="http://tumblr.com" />
        </li>
        <br />
        <li>
            <SocialIcon url="http://flickr.com" />
            &nbsp;<SocialIcon url="http://foursquare.com" />
            &nbsp;<SocialIcon url="http://meetup.com" />
        </li>
        <br />
      </div>
    )
  }

  render() {
    return (
      <div className="main_PopularLinks text-center">
        <h2>Daily Apps</h2>
        <a href="https://www.facebook.com/" target="_top">Facebook</a>
        <div className="box">
          <iframe src="https://www.facebook.com/" target="_top" width = "500px" height = "500px"></iframe>
        </div>
        <hr />
        <ul>
          {this.showList()}
        </ul>
        <br />
      </div>
    );
  }
}

export default PopularLinks;
