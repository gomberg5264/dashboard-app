import React, { Component } from 'react';
import '../stylesheets/PopularLinks.css';
import { SocialIcon } from 'react-social-icons';
import {Popover, OverlayTrigger} from 'react-bootstrap';

class PopularLinks extends Component {
  constructor() {
    super();
    this.showList = this.showList.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
  }

  moreInfo(title) {
    return (
      <Popover>
        <span>{title}</span>
      </Popover>
    )
  }

  showList() {
    return (
      <ul className="align-center apps-body">
        <li>
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo('Facebook')}>
              <SocialIcon url="http://facebook.com" />
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo('Twitter')}>
              <SocialIcon url="http://twitter.com" />
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo('YouTube')}>
              <SocialIcon url="http://youtube.com" />
            </OverlayTrigger>
        </li>
        <br />
        <li>
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo('Dropbox')}>
              <SocialIcon url="http://dropbox.com" />
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo('GitHub')}>
              <SocialIcon url="http://github.com" />
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo('Google+')}>
              <SocialIcon url="https://plus.google.com" />
            </OverlayTrigger>
        </li>
        <br />
        <li>
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo('Pinterest')}>
              <SocialIcon url="http://pinterest.com" />
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo('LinkedIn')}>
              <SocialIcon url="http://linkedin.com" />
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo('Tumblr')}>
              <SocialIcon url="http://tumblr.com" />
            </OverlayTrigger>
        </li>
        <br />
        <li>
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo('Flickr')}>
              <SocialIcon url="http://flickr.com" />
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo('FourSquare')}>
              <SocialIcon url="http://foursquare.com" />
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo('MeetUp')}>
              <SocialIcon url="http://meetup.com" />
            </OverlayTrigger>
        </li>
        <br />
      </ul>
    )
  }

  render() {
    return (
      <div className="main_PopularLinks text-center">
        <h2 className="apps-header">
          <i className="fa fa-link" aria-hidden="true"></i>
          &nbsp;
          Apps Link
        </h2>
        {this.showList()}
        <br />
      </div>
    );
  }
}

export default PopularLinks;
