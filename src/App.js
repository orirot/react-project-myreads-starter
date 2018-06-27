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

    getBookFromShelvedBooks(updatedBookId) {
        const {shelvedBooks} = this.state
        const book = shelvedBooks.find((b) => {
            return b.id === updatedBookId
        })
        return book;
    }

    bookShelfChanger = (event, updatedBook) => {
        const {shelvedBooks} = this.state
        const book = this.getBookFromShelvedBooks(updatedBook.id);
        if (book){
            book.shelf = event.target.value
        }
        BooksAPI.update(updatedBook, event.target.value)
            .then(()=> {
                this.componentDidMount()
            })
        this.setState({
            shelvedBooks: shelvedBooks
        })
    }

    getBookShelf = (bookId) => {
        const book = this.getBookFromShelvedBooks(bookId)
        let shelf = "none"
        if (book) {
            shelf = (book.shelf !== null && book.shelf !== '' && book.shelf) || null
        }
        return shelf
    }

    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <MainScreenBooks
                        getBookShelf = {this.getBookShelf}
                        bookShelfChanger = {this.bookShelfChanger}
                        books = {this.state.shelvedBooks}
                    />
                )}/>

                <Route path="/search"  render= {() => (
                    <SearchInBooks
                        getBookShelf = {this.getBookShelf}
                        bookShelfChanger = {this.bookShelfChanger}
                    />
                )}/>

            </div>
        )
    }
}

export default BooksApp
