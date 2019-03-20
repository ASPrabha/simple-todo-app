import React, { Component } from 'react';
import './TodoList.css';

import TodoItem from '../TodoItem/TodoItem';

class TodoList extends Component {
  _onChange = (id) => {
    this.props.onChange(id);
  }

  _onDelete = (id) => {
    this.props.onDelete(id);
  }

  _onUpdate = (id, value) => {
    this.props.onUpdate(id, value);
  }

  render() {
    const { data } = this.props;
    return(
      <div>
        <div className='task-list'>
          TODO
          <hr />
          {data.map(todoItem => {
            return (!todoItem.completed ? 
              <TodoItem
                key={todoItem.id}
                todoItem={todoItem}
                isChecked={false}
                onChange={this._onChange}
                onDelete={this._onDelete}
                onUpdate={this._onUpdate}
              /> : '');
          })}
        </div>
        <div className='task-list'>
          COMPLETED TASK   
          <hr />       
          {data.map(todoItem => {
            return (todoItem.completed ? 
              <TodoItem
                  key={todoItem.id}
                  todoItem={todoItem}
                  isChecked={true}
                  onChange={this._onChange}
                  onDelete={this._onDelete}
              />: '');
          })} 
        </div>
      </div>
    );
  }
}

export default TodoList;