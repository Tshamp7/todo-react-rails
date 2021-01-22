import React, { Component } from "react";
import axios from "axios";

class TodosContainer extends Component {
  render() {
    return (
      <div className="inputContainer">
        <input
          type="text"
          className="taskInput"
          placeholder="Add a task"
          maxLength="50"
        />
        <div className="listWrapper">
          <ul className="taskList"></ul>
        </div>
      </div>
    );
  }
}

export default TodosContainer;
