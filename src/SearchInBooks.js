import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BooksGrid from "./BooksGrid";
import PropTypes from 'prop-types';

class SearchInBooks extends Component{

    static propTypes = {
        getBookShelf: PropTypes.func.isRequired,
        bookShelfChanger: PropTypes.func.isRequired
    }

    constructor (props){
        super(props);
        this.state = {booksFromSearch: []}
        this.onSearch = this.onSearch.bind(this)
    }

    onSearch = (event) => {
        const updatedQuery = event.target.value
        if (updatedQuery && updatedQuery !== '') {
            console.log("updatedQuery" + updatedQuery.trim())
            BooksAPI.search(updatedQuery.trim()).then(
                (books) => {
                    this.setState({
                        booksFromSearch: books
                    })
                }
            )
        }else {
            this.setState({
                booksFromSearch: []
            })
        }

    }

    render(){
        const booksFromSearch = this.state.booksFromSearch
        const { bookShelfChanger } = this.props

        const showingBooks = booksFromSearch && booksFromSearch.length > 0 ? true : false

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
                        <input type="text" placeholder="Search by title or author" onChange={this.onSearch}/>

                    </div>
                </div>
                <div className="search-books-results">
                    {showingBooks && (
                        <BooksGrid
                            getBookShelf={this.props.getBookShelf}
                            bookShelfChanger={(event, updatedBook) => {bookShelfChanger(event, updatedBook)}}
                            books={booksFromSearch}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default SearchInBooks
