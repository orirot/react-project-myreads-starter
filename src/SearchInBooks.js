import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import MainScreenBooks from "./MainScreenBooks";

class SearchInBooks extends Component{

    static propTypes = {
        bookShelfChanger: PropTypes.func.isRequired,
    }

    state = {
        // query: '',
        booksFromSearch: []
    }

    componentDidMount(){
       this.state.booksFromSearch = []
    }

    doSome = (event) => {
        const updatedQuery = event.target.value
        BooksAPI.search(updatedQuery).then(
            (books) => {
                this.setState({
                    booksFromSearch: books
                })
            }
        )
    }

    render(){
        const booksFromSearch = this.state.booksFromSearch

        const showingBooks = booksFromSearch.length > 0

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" onChange={(event)=>(this.doSome(event))}/>

                    </div>
                </div>
                <div className="search-books-results">
                    {showingBooks && (
                    <MainScreenBooks
                        books = {booksFromSearch}
                        bookShelfChanger = {this.props.bookShelfChanger}
                    />
                    )}
                </div>
            </div>
        )
    }


}

export default SearchInBooks
