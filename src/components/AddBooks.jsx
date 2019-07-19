import React, { Component } from 'react';
import axios from 'axios';

class AddBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            author: '',
            description: ''
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log('Change detected. State updated' + name + ' = ' + value);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const book = {
            "name": this.state.name,
            "author": this.state.author,
            "description": this.state.description
        }
        axios
            .post('http://localhost:9000/append', book)
            .then(() => console.log('Book Created'))
            .catch(err => {
                console.error(err);
            });
        // const request = require('request');
        // var req = request.post("localhost:9000/update", function (err, resp, body) {
        //     if (err) {
        //       console.log('Error!');
        //     } else {
        //       console.log('URL: ' + body);
        //     }
        //   });
        //   var form = req.form();
        //   form.append('file', '<FILE_DATA>', {
        //     filename: 'myfile.txt',
        //     contentType: 'text/plain'
        //   });
    }

    render() {
        return (
            <div className="add-wrap">
                <h5>Fill in the books details</h5>
                <form >
                    <div className="form-group">
                        <label htmlFor="nameInput">Book Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={(event) => this.handleInputChange(event)} className="form-control" id="nameInput" placeholder="Name" />
                        <label htmlFor="authInput">Author Name</label>
                        <input type="text" name="author" value={this.state.author} onChange={(event) => this.handleInputChange(event)} className="form-control" id="authInput" placeholder="Author" />
                        <label htmlFor="descInput">Book Description</label>
                        <input type="text" name="description" value={this.state.description} onChange={(event) => this.handleInputChange(event)} className="form-control" id="descInput" placeholder="Description" />
                        <div className="btn-wrap">
                            <button className="btn" onClick={(event) => this.handleSubmit(event)}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


export default AddBooks;