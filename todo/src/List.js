import React, { Component } from 'react';
import history from './history';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoItems: this.props.todoItems,
            activatedTodo: this.props.activatedTodo
        }
    }
    toggleTodo = (todo) => this.setState({
        todoItems:
            this.state.todoItems.map(item => item.action === todo.action
                ? { ...item, done: !item.done } : item)
    });
    todoTableRows = () => this.state.todoItems.map(item =>
        <tr key={item.action}>
            <td>{item.action}</td>
            <td>
                <input type="checkbox" checked={item.done}
                    onChange={() => this.toggleTodo(item)} />
            </td>
            <td className="text-center"><a onClick={(e) => this.editTodo(e, item)}><i className="fa fa-pencil-square-o m-2" style={{ cursor: 'pointer' }} /></a></td>
            <td className="text-center"><a onClick={(e) => this.deleteTodo(e, item)}><i className="fa fa-times m-2" style={{ cursor: 'pointer' }} /></a></td>
        </tr>
    );
    deleteTodo(e, item) {
        let todosStr = localStorage.getItem("todos");
        let todos = JSON.parse(todosStr);
        let foundTodo = todos.find(todo => todo.id == item.id);
        let index = todos.indexOf(foundTodo);
        todos.splice(index, 1);
        this.setState({ todoItems: todos });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    editTodo(e, item) {
        let todosStr = localStorage.getItem("todos");
        let todos = JSON.parse(todosStr);
        var foundTodo = todos.find(todo => todo.id == item.id);
        let index = todos.indexOf(foundTodo);
        var todoToBeEdited = todos[index];

        this.setState({ activatedTodo: todoToBeEdited });
        localStorage.setItem('activatedTodo', JSON.stringify(todoToBeEdited));
        history.push('/Create');
    }
    componentDidMount = () => {
        let data = localStorage.getItem("todos");
        this.setState({ todoItems: data != null ? JSON.parse(data) : this.state.todoItems });
    }

    render = () =>
        <div className="row">
            <div className="col-sm-6 text-center offset-md-3">
                <table className="table table-striped table-bordered col-md-8 mt-5">
                    <thead>
                        <tr><th>Description</th><th>Done</th><th>Edit</th><th>Delete</th></tr>
                    </thead>
                    <tbody>{this.todoTableRows()}</tbody>
                </table>
            </div>
        </div>
}
