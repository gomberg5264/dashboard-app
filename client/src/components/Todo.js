import React, { Component } from 'react';
import '../stylesheets/Todo.css';
import axios from 'axios';
import {Button, Glyphicon} from 'react-bootstrap';
import $ from 'jquery';
import alertify from 'alertify.js';
import {Popover, OverlayTrigger} from 'react-bootstrap';

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    }
    this.addTodo = this.addTodo.bind(this);
    this.listTodos = this.listTodos.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
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

  moreInfo() {
    return (
      <Popover className="aboutNewsWidget" title="About 'Weather'">
        <p>
          This widget gives you the current weather and next 5 days forecast.
        </p>
        <ul>
          <li><strong>Enter Your Zipcode</strong>: Enter your zipcode at the top, and press 'Enter'.
           It will be saved in locally the next time you visit.</li><br />
          <li><strong>Can't Read Full Summary</strong>: If the summary is too long, hover your
          mouse/trackpad on the summary, and scroll down to read full weather summary</li>
        </ul>
      </Popover>
    );
  }

  render() {
    return (
      <div className="main_Todo text-center">
        <h2 className="pull-left">
          &nbsp;
          <i className="fa fa-book" aria-hidden="true"></i>
          &nbsp;
          Dictionary
        </h2>
          <input
            className="weather-input text-center"
            type="text"
            placeholder="Enter Your Word"
            ref={(input) => { this.todoItem = input; }}
            onKeyPress={this.addTodo}
          />
        <span className="pull-right">
          <OverlayTrigger trigger="hover" placement="top" overlay={this.moreInfo()}>
            <i className="fa fa-info-circle moreInfoBtn" aria-hidden="true"></i>
          </OverlayTrigger>
        </span>
        <br />
        {this.listTodos()}
    </div>
    );
  }
}

export default Todo;
