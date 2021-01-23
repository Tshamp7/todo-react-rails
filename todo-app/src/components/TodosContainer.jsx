import React, { Component } from "react";
import axios from "axios";

class TodosContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      enteredTodo: "",
    };
  }

  getTodos() {
    axios
      .get("/api/v1/todos")
      .then((response) => {
        console.log(`api response: ${response.data}`);
        this.setState({ todos: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount = () => {
    this.getTodos();
    console.log(`todos: ${this.state.todos}`);
  };

  onCheckClick = (e, id) => {
    axios
      .put(`/api/v1/todos/${id}`, { todo: { done: e.target.checked } })
      .then((response) => {
        const todoIndex = this.state.todos.findIndex(
          (x) => x.id === response.data.id
        );
        const newTodos = [...this.state.todos];
        newTodos[todoIndex] = response.data;
        this.setState({ todos: newTodos });
      });
  };

  handleSubmit = () => {
    if (this.state.enteredTodo.length >= 5) {
      console.log(this.state.enteredTodo);
      axios
        .post("/api/v1/todos", {
          todo: { title: this.state.enteredTodo, done: false },
        })
        .then((response) => {
          this.setState({ todos: [...this.state.todos, response.data] });
          console.log(this.state.todos);
        });
    }
  };

  renderTodoList = () => {
    return this.state.todos.map((todo) => {
      return (
        <li className="task" todo={todo} key={todo.id}>
          <input
            checked={todo.done}
            type="checkbox"
            className="taskCheckbox"
            onChange={(e) => this.onCheckClick(e, todo.id)}
          />
          <label className="taskLabel">{todo.title}</label>
          <span className="deleteTaskBtn">x</span>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="inputContainer">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="taskInput"
            placeholder="Add a task"
            maxLength="50"
            onChange={(e) => this.setState({ enteredTodo: e.target.value })}
          />
          <div className="listWrapper">
            <ul className="taskList">{this.renderTodoList()}</ul>
          </div>
        </form>
      </div>
    );
  }
}

export default TodosContainer;
