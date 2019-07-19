import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorComponent from './ErrorComponent';
import '../styles/styles.css';
import SearchBar from './SearchBar';
import setBookList from '../actions';
import { store } from '../store';

function Book(props) {
    return (
        <React.Fragment>
            <tr className="book-list-row">
                <td>{props.bookDetails._id}</td>
                <td>{props.bookDetails.name}</td>
                <td>{props.bookDetails.author}</td>
            </tr>
        </React.Fragment>
    )
}

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        }
    }

    dispatchBookAction = (books) => {
        store.dispatch(setBookList(books));
    }

    callAPI() {
        fetch("http://localhost:9000/BookAPI")
            .then(res => res.text())
            .then(res => this.dispatchBookAction(JSON.parse(res)));
    }

    componentWillMount() {
        this.callAPI();
    }

    searchData(e) {
        var filterData = [];
        if(e.target.value !== '') {
          this.props.books.forEach(function(book) {
    
              if(book.name.toLowerCase().indexOf(e.target.value)!==-1) {
                filterData.push(book);
              }
          });
        }
        else {
            filterData = null;
        }
        this.setState({filterData: filterData});
      }

    render() {
        let books = this.state.filterData ? this.state.filterData : this.props.books;
        return (
            <div className="list-page-wrap">
            <SearchBar search={this.searchData.bind(this)} />
                <table>
                    <thead className="list-header">
                        <tr>
                            <th>ID</th>
                            <th>Book name</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody className="book-list">
                        {
                            books ?
                                books.map((book) => {
                                    return <Book key={book._id} bookDetails={book} />
                                }) :
                                <ErrorComponent error={this.state.error} />
                        }
                    </tbody>
                </table>
            </div>
        );
    };
}

// const mapStateToProps = state => ({
//     books: state.data
// })

function mapStateToProps(state) {
    console.log("Hey", state);
    return {
        books: state.books,
        error: null
    };
}

export default connect(mapStateToProps)(BookList);