import React, { Component } from 'react';
import '../stylesheets/PopularLinks.css';
import { SocialIcon } from 'react-social-icons';
import {Popover, OverlayTrigger} from 'react-bootstrap';

class PopularLinks extends Component {
  constructor() {
    super();
    this.showList = this.showList.bind(this);
    this.appInfo = this.appInfo.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
  }

  appInfo(title) {
    return (
      <Popover>
        <span>{title}</span>
      </Popover>
    )
  }

  moreInfo() {
    return (
      <Popover className="aboutNewsWidget" title="About 'Links'">
        <p>
          This widget has the links to some of the most popular apps that you may visit daily.
        </p>
        <ul>
          <li><strong>Don't Recognize The Icon?</strong>: Hover on the app icon, and it'll tell you.
          </li><br />
          <li><strong>Open An App</strong>: Click on any app icon, and it'll take you to the app's site.
          </li>
        </ul>
      </Popover>
    )
  }

  showList() {
    return (
      <ul className="align-center apps-body">
        <li>
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.appInfo('Facebook')}>
              <SocialIcon url="http://facebook.com" />
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.appInfo('Twitter')}>
              <SocialIcon url="http://twitter.com" />
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.appInfo('YouTube')}>
              <SocialIcon url="http://youtube.com" />
            </OverlayTrigger>
        </li>
        <br />
        <li>
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.appInfo('Dropbox')}>
              <SocialIcon url="http://dropbox.com" />
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.appInfo('GitHub')}>
              <SocialIcon url="http://github.com" />
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.appInfo('Google+')}>
              <SocialIcon url="https://plus.google.com" />
            </OverlayTrigger>
        </li>
        <br />
        <li>
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.appInfo('Pinterest')}>
              <SocialIcon url="http://pinterest.com" />
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.appInfo('LinkedIn')}>
              <SocialIcon url="http://linkedin.com" />
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.appInfo('Tumblr')}>
              <SocialIcon url="http://tumblr.com" />
            </OverlayTrigger>
        </li>
        <br />
        <li>
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.appInfo('Flickr')}>
              <SocialIcon url="http://flickr.com" />
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.appInfo('FourSquare')}>
              <SocialIcon url="http://foursquare.com" />
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.appInfo('MeetUp')}>
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
        <h2 className="pull-left">
          &nbsp;
          <i className="fa fa-link" aria-hidden="true"></i>
          &nbsp;
          Links
        </h2>
        <span className="pull-right">
          <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo()}>
            <i className="fa fa-info-circle moreInfoBtn" aria-hidden="true"></i>
          </OverlayTrigger>
        </span>
        <br /><br />
        {this.showList()}
        <br />
      </div>
    );
  }
}

export default PopularLinks;
