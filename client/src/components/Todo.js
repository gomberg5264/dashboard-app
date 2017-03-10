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
        <h2>Todo -> Music</h2>
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
      </div>
    );
  }
}

export default Todo;
