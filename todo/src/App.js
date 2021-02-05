import React, { Component } from 'react';
import Create from './Create';
import List from './List';
import Home from './Home';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "Sheerin",
            todoItems: [],
            newItemText: "",
            activatedTodo:""
        }
    }

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-dark justify-content-between" style={{ backgroundColor: "#4d5099" }}>
                            <a className="navbar-brand" href="#">TODO</a>
                            <ul className="navbar-nav justify-content-end">
                                <li className="nav-item mr-5">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item mr-5">
                                    <Link to="/Create" className="nav-link">Create</Link>
                                </li>
                                <li className="nav-item mr-5">
                                    <Link to="/List" className="nav-link">List</Link>
                                </li>
                            </ul>
                        </nav>

                        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/Create">
                                <Create newItemText={this.state.newItemText} todoItems={this.state.todoItems} />
                            </Route>
                            <Route path="/List">
                                <List todoItems={this.state.todoItems} activatedTodo={this.state.activatedTodo} />
                            </Route>
                            <Route path="/">
                                <Home userName={this.state.userName} />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}





