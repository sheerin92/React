import React, { Component } from 'react';

export default class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todoItems: this.props.todoItems,
            newItemText: this.props.newItemText
        }
    }
    updateNewTextValue = (event) => {
        this.setState({ newItemText: event.target.value });
    }
    createNewTodo = () => {
        let todosStr = localStorage.getItem("todos");
        let todos = todosStr != null ? JSON.parse(todosStr) : this.state.todoItems
        if (!todos
            .find(item => item.action === this.state.newItemText)) {
            this.setState({
                todoItems: [...todos,
                { id: this.generateID(), action: this.state.newItemText, done: false }],
                newItemText: ""
            }, () => localStorage.setItem("todos", JSON.stringify(this.state.todoItems)));
        }
    }
    generateID = () => {
        return Math.floor(Math.random() * 100)
    };
    getTodoToBeEdited = () => {
        let activatedTodoStr = localStorage.getItem('activatedTodo');
        let activatedTodo = JSON.parse(activatedTodoStr);
        this.setState({ newItemText: activatedTodo.action });
    }

    updateTodo = () => {
        let todosStr = localStorage.getItem("todos");
        let todos = JSON.parse(todosStr);
        let activatedTodoStr = localStorage.getItem('activatedTodo');
        let activatedTodo = activatedTodoStr != null ? JSON.parse(activatedTodoStr) : "";

        const id = activatedTodo.id;
        const editedTodo = this.state.newItemText;

        var foundTodo = todos.find(todo => {
            return todo.id == id;
        });
        foundTodo.action = editedTodo;
        this.setState({newItemText:""});

        localStorage.setItem('todos', JSON.stringify(todos));
    }

    render = () =>
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6 text-center offset-md-3">
                    <input className="col-md-12 form-control mt-5"
                        value={this.state.newItemText}
                        onChange={this.updateNewTextValue} />
                    <button className="btn btn-info col-md-2 mt-3"
                        onClick={this.createNewTodo}>Add</button>
                    <button className="btn btn-info col-md-2 mt-3" style={{ marginLeft: '5' }}
                        onClick={this.getTodoToBeEdited}>Edit</button>
                    <button className="btn btn-info col-md-2 mt-3" style={{ marginLeft: '5' }}
                        onClick={this.updateTodo}>Update</button>
                </div>
            </div>
        </div>
}