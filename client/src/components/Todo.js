import React, { Component } from 'react';
import '../stylesheets/Todo.css';
import axios from 'axios';

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      list: {}
    }
    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {
    axios.get('/todo/list')
    .then((response) => {
      // this.setState({
      //   list: response.data['list']
      // })
      console.log(response);
    })
    .catch((err) => { console.error(err); });
  }

  addTodo() {
    axios.post('/todo/new', {
      data: this.todoItem.value
    })
    .then((response) => {
      this.todoItem.value = null;
      // console.log(response);
    })
    .catch((err) => { console.error(err); });
  }

  render() {
    return (
      <div className="main_Todo">
        <h1>Todo List</h1>
        <ul>
        </ul>
        <input
          type="text"
          placeholder="Add Todo Item"
          ref={(input) => { this.todoItem = input; }}
        />
        <input
          type="button"
          value="Add"
          onClick={this.addTodo}
        />
    </div>
    );
  }
}

export default Todo;
