import React, { Component } from 'react';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    render = () => <div>
        <h4 className="bg bg-primary text-white col-lg-6 text-center p-5 offset-md-3 mt-5">
            {this.props.userName}'s To Do List
</h4>
    </div>
}