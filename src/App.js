import React from 'react';
import { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchInBooks from "./SearchInBooks";
import {Route} from 'react-router-dom';
import MainScreenBooks from "./MainScreenBooks";

class BooksApp extends Component {
    state = {
        shelvedBooks: []
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    shelvedBooks: books
                }));
            })
    }

    bookShelfChanger = (event, updatedBook) => {
        const { shelvedBooks } = this.state
        const book  = shelvedBooks.find((b) => {
            return b.id === updatedBook.id
        })
        book.shelf = event.target.value
        BooksAPI.update(updatedBook, book[0].shelf)
        this.setState({
            shelvedBooks: shelvedBooks
        })
    }


    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <MainScreenBooks
                        bookShelfChanger = {this.bookShelfChanger}
                        books = {this.state.shelvedBooks}
                    />
                )}/>

                <Route path="/search"  render= {() => (
                    <SearchInBooks/>
                )}/>

            </div>
        )
    }
}

export default BooksApp
