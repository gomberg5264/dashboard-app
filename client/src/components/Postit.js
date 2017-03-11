import React, { Component } from 'react';
import '../stylesheets/Postit.css';
import axios from 'axios';
import {Button, Glyphicon, Popover, OverlayTrigger} from 'react-bootstrap';
import alertify from 'alertify.js';
import gmail_icon from '../images/gmail-icon.png';

class Postit extends Component {
  constructor() {
    super();

    /*******************GMAIL API SETUP********************************************/
    // Client ID and API key from the Developer Console
    var CLIENT_ID = '819586713170-31c2eokved61hm54b6mg6pfen3r6qmrk.apps.googleusercontent.com';

    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

    var authorizeButton = document.getElementById('authorize-button');
    var signoutButton = document.getElementById('signout-button');
    /*******************GMAIL API END********************************************/

    this.moreInfo = this.moreInfo.bind(this);
    this.handleClientLoad = this.handleClientLoad.bind(this);
    this.initClient = this.initClient.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.handleSignoutClick = this.handleSignoutClick.bind(this);
    this.appendPre = this.appendPre.bind(this);
    this.listMessages = this.listMessages.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }

  /**
       *  On load, called to load the auth2 library and API client library.
       */
      handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      initClient() {
        gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          listMessages();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in content element.
       */
      appendPre(message) {
        var content = document.getElementById('content');
        content.innerHTML += `${message} <br/>`
      }

      /**
       * Retrieve Messages in user's mailbox matching query.
       *
       * @param  {String} userId User's email address. The special value 'me'
       * can be used to indicate the authenticated user.
       * @param  {Unsigned Int} maxResults Total emails requested.
       */
      listMessages() {
        gapi.client.gmail.users.messages.list({
          'userId': 'me',
          'maxResults': 30,
        }).then(function(response) {
          response.result.messages.map(email => {
            getMessage(email.id);
          })
        });
      }

      /**
       * Get Message with given ID.
       *
       * @param  {String} userId User's email address. The special value 'me'
       * can be used to indicate the authenticated user.
       * @param  {String} messageId ID of Message to get.
       */
      getMessage(messageId) {
        gapi.client.gmail.users.messages.get({
          'userId': 'me',
          'id': messageId,
        }).then(function(response) {
          if (response.result.labelIds !== undefined)
            appendPre('unread?: ' + response.result.labelIds[0]);
          if (response.result !== undefined)
            appendPre(`<a href='https://mail.google.com/mail/u/0/#inbox/${response.result.id}' target='_blank'>snippet: ${response.result.snippet}`);
          if (response.result.payload.headers !== undefined) {
            var sender = 'Unknown', subject = 'Unknown', time = 'Unknown';
            response.result.payload.headers.map(header => {
              if (header.name === 'From') {
                sender = header.value;
              }
              if (header.name === 'Subject') {
                subject = header.value;
              }
              if (header.name === 'Date') {
                time = header.value;
              }
            })
            appendPre(`<a href='https://mail.google.com/mail/u/0/#inbox/${response.result.id}' target='_blank'>subject: ${subject}`);
            appendPre('sender: ' + sender);
            appendPre('time: ' + time);
          }
          appendPre('\n');
        })
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
        <div id="content"></div>
        <span className="pull-right">
          <button type="button" className="login-gmail pull-left">
            Login&nbsp;<img className="gmail-icon pull-right" src={gmail_icon} width="30px" height="30px" />
          </button>
          {/* Add buttons to initiate auth sequence and sign out */}
          <button id="authorize-button">Login</button>
          <button id="signout-button">Sign Out</button>
        </span>
        <script async defer src="https://apis.google.com/js/api.js"
          onload="this.onload=function(){};handleClientLoad()"
          onreadystatechange="if (this.readyState === 'complete') this.onload()">
        </script>
    </div>
    );
  }
}

export default Postit;
