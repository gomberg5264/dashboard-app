import React, { Component } from 'react';
import '../stylesheets/Todo.css';
import axios from 'axios';
import {Button, Glyphicon} from 'react-bootstrap';
import $ from 'jquery';
import alertify from 'alertify.js';

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    }
    this.addTodo = this.addTodo.bind(this);
    this.listTodos = this.listTodos.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.udpateTodo = this.updateTodo.bind(this);
  }

  componentDidMount() {
    axios.get('auth/login')
    .then((response) => {
      if (response.data.status === 'You are already logged in') {
        axios.get('/todo/list')
        .then((response) => {
          this.setState({
            list: response.data['list']
          })
          // console.log(response);
        })
        .catch((err) => { console.error(err); });
      }
    })
  }

  addTodo() {
    axios.get('auth/login')
    .then((response) => {
      if (response.data.status === 'You are not logged in yet') {
        alertify.alert('Please login or register before adding a todo item. Thank you.');
      }
      if (response.data.status === 'You are already logged in') {
        axios.post('/todo/new', {
          data: this.todoItem.value
        })
        .then((response) => {
          if (response.data['success']) {
            this.todoItem.value = null;
            this.componentDidMount();
          }
        })
        .catch((err) => { console.error(err); });
      }
   });
  }

  deleteTodo(id) {
    axios.post('/todo/delete', {
      id: id
    })
    .then((response) => {
      if (response.data['success']) {
        this.componentDidMount();
      }
    })
    .catch((err) => { console.error(err); });
  }

  updateTodo(id, title) {
    const content = `<input class="inputClass" type="text" value="${title}" id="todo-input-${id}" />
                     <input type="submit" value="Save" id="add-todo-${id}" />`;
    var newTitle = null;
    $(`#todo-${id}`).html(content);
    $(`#add-todo-${id}`).click(() => {
      newTitle = $(`#todo-input-${id}`).val();
      // console.log(newTitle);
      axios.post('/todo/update', {
         id: id,
         newTitle: newTitle
      })
      .then((response) => {
        if (response.data['success']) {
          // issue with edit: need to refresh before the data shows from database
          // temporary fix for edit, showing hardcoded text value, not from database
          // refresh the list from database after done editing
          $(`#todo-${id}`).html(newTitle);
        }
      })
      .catch((err) => { console.error(err); });
    })
  }

  listTodos() {
      return (
        this.state.list.map(elem => (
          <li id={`todo-${elem.id}`}><span className="pull-left">{elem.title}</span>
              &nbsp;&nbsp;&nbsp;
            <Glyphicon className="pull-right" onClick={() => this.deleteTodo(elem.id)} glyph="glyphicon glyphicon-trash align-right" />
            &nbsp;&nbsp;
            <Glyphicon className="pull-right" onClick={() => this.updateTodo(elem.id, elem.title)} glyph="glyphicon glyphicon-pencil align-right" />
          </li>
          )
        )
    )
  }

  render() {
    return (
      <div className="main_Todo text-center">
      {/*
        <h2>Todo -> Music/Gmail/Wit.AI</h2>
        <hr />
        <input
          className="inputClass"
          type="text"
          placeholder="Enter Todo Item"
          ref={(input) => { this.todoItem = input; }}
        />
        &nbsp;
        <input
          className="add_button"
          type="button"
          value="Add"
          onClick={this.addTodo}
        />
        <ul>
          {this.listTodos()}
        </ul>
      */}

      <p>Gmail API Quickstart</p>
        {/* Add buttons to initiate auth sequence and sign out */}
        <button id="authorize-button" style="display: none;">Authorize</button>
        <button id="signout-button" style="display: none;">Sign Out</button>

        <pre id="content"></pre>

        <script type="text/javascript">
          {/* Client ID and API key from the Developer Console */}
          var CLIENT_ID = '819586713170-31c2eokved61hm54b6mg6pfen3r6qmrk.apps.googleusercontent.com';

          {/* Array of API discovery doc URLs for APIs used by the quickstart*/}
          var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

          {/* Authorization scopes required by the API; multiple scopes can be*/}
          {/* included, separated by spaces.*/}
          var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

          var authorizeButton = document.getElementById('authorize-button');
          var signoutButton = document.getElementById('signout-button');

          {/*
           *  On load, called to load the auth2 library and API client library.
           */}
          function handleClientLoad() {
            gapi.load('client:auth2', initClient);
          }

          {/*
           *  Initializes the API client library and sets up sign-in state
           *  listeners.
           */}
          function initClient() {
            gapi.client.init({
              discoveryDocs: DISCOVERY_DOCS,
              clientId: CLIENT_ID,
              scope: SCOPES
            }).then(function () {
              {/* Listen for sign-in state changes. */}
              gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

              {/* Handle the initial sign-in state. */}
              updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
              authorizeButton.onclick = handleAuthClick;
              signoutButton.onclick = handleSignoutClick;
            });
          }

          {/*
           *  Called when the signed in status changes, to update the UI
           *  appropriately. After a sign-in, the API is called.
           */}
          function updateSigninStatus(isSignedIn) {
            if (isSignedIn) {
              authorizeButton.style.display = 'none';
              signoutButton.style.display = 'block';
              listMessages();
            } else {
              authorizeButton.style.display = 'block';
              signoutButton.style.display = 'none';
            }
          }

          {/*
           *  Sign in the user upon button click.
           */}
          function handleAuthClick(event) {
            gapi.auth2.getAuthInstance().signIn();
          }

          {/*
           *  Sign out the user upon button click.
           */}
          function handleSignoutClick(event) {
            gapi.auth2.getAuthInstance().signOut();
          }

          {/*
           * Append a pre element to the body containing the given message
           * as its text node. Used to display the results of the API call.
           *
           * @param {string} message Text to be placed in pre element.
           */}
          function appendPre(message) {
            var pre = document.getElementById('content');
            var textContent = document.createTextNode(message + '\n');
            pre.appendChild(textContent);
          }

          {/*
           * Retrieve Messages in user's mailbox matching query.
           *
           * @param  {String} userId User's email address. The special value 'me'
           * can be used to indicate the authenticated user.
           * @param  {Unsigned Int} maxResults Total emails requested.
           */}
          function listMessages() {
            gapi.client.gmail.users.messages.list({
              'userId': 'me',
              'maxResults': 30,
            }).then(function(response) {
              response.result.messages.map(email => {
                getMessage(email.id);
              })
            });
          }


        </script>

        <script async defer src="https://apis.google.com/js/api.js"
          onload="this.onload=function(){};handleClientLoad()"
          onreadystatechange="if (this.readyState === 'complete') this.onload()">
        </script>
      </div>
    );
  }
}

export default Todo;
