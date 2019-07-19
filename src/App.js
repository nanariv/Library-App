import React, {Component} from 'react';
import './styles/styles.css';
import BookList from './components/BookList';
import { store } from './store';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import AddBooks from './components/AddBooks';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { books: "" };
    }

    render() {
        return (
            <Provider store={store} >
                <Router>
                <header>
                <h4 className="app-header-text">Library app</h4>
                <div className="nav-bar-links">
                    <NavLink to="/" className="link-text" activeClassName="active-link">Book List</NavLink>
                    <NavLink to="/add" className="link-text">Add Books</NavLink>
                </div>
                </header>
                    <Switch>
                        <Route exact path="/" render={ () => <BookList/>} /> 
                        <Route exact path="/add" render={ () => <AddBooks/>} />
                    </Switch>
                    
                </Router>
            </Provider>
        );
    }
}

export default App;
