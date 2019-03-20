import React, { Component } from 'react';
import './TodoApp.css';

import TodoList from '../TodoList/TodoList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state= {
      todoList: [],
      inputTodo: ''
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({inputTodo: e.target.value})
  };

  addTodo = (e) => {
    e.preventDefault();
    const { inputTodo, todoList } = this.state;
    const item = {
      id: Math.floor(Math.random() * Math.random() * 1000000),
      name: inputTodo,
      completed: false
    };

    if (inputTodo !== '') {
      todoList.push(item);
      this.setState({todoList, inputTodo: ''});
    }
  };

  completeTodo = (id) => {
    const { todoList } = this.state;
    todoList[todoList.findIndex(temp => temp.id === id)].completed = !todoList[todoList.findIndex(temp => temp.id === id)].completed;

    this.setState({todoList});
  }

  deleteTodo = (id) => {
    const { todoList } = this.state;
    todoList.splice(todoList.findIndex(temp => temp.id === id), 1);

    this.setState({todoList});
  }

  updateTodo = (id, value) => {
    const { todoList } = this.state;
    todoList[todoList.findIndex(temp => temp.id === id)].name = value;

    this.setState({todoList});
  }

  render() {
    const { todoList, inputTodo } = this.state;

    return (
      <div className="App">
        <div className="add-textfield">
          ADD ITEM
          <hr />
          <form onSubmit={this.addTodo}>
            <input 
              type="text"
              value={inputTodo}
              onChange={this.handleChange}
              className="input-text"
            />
            <button className="custom-buttons" type="submit" onClick={this.addTodo}>Add</button>
          </form>
        </div>
        
        <TodoList data={todoList} onChange={this.completeTodo} onDelete={this.deleteTodo} onUpdate={this.updateTodo}/>
      </div>
    );
  }
}

export default App;
