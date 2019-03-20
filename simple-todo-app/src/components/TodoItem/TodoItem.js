import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditable: false,
      inputValue: ''
    }
  }
  editTodo = () => {
    const { todoItem } = this.props;
    
    this.setState({isEditable: true, inputValue: todoItem.name});
  }

  updateTodo = (e) => {
    e.preventDefault();

    const { inputValue } = this.state;
    const { todoItem } = this.props;

    this.props.onUpdate(todoItem.id, inputValue);

    this.setState({isEditable: false});
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({inputValue: e.target.value})
  };

  render() {
    const { todoItem, isChecked = 'false' } = this.props;
    const { isEditable, inputValue } = this.state;

    return(
      <div className="todo-item">
        <input type="checkbox" checked={isChecked} onChange={() => this.props.onChange(todoItem.id)} value={todoItem.name}></input>
        {isEditable ? 
        <form onSubmit={this.updateTodo}>
          <input 
            type="text"
            value={inputValue}
            onChange={this.handleChange}
            className="input-text"
          />
          <button className="custom-buttons" type="submit" onClick={this.updateTodo}>SAVE</button>
        </form>
        :
        <span>
          <span className={`${isChecked && 'completed-task'} todo-name`}>{todoItem.name}</span>
          <button className="custom-buttons" type="submit" onClick={this.editTodo}>EDIT</button>
        </span>
        }
        <button className="custom-buttons" onClick={() => this.props.onDelete(todoItem.id)}>DELETE</button>
      </div>
    );
  };
}

export default TodoItem;