import React from 'react';
import { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchInBooks from "./SearchInBooks";
import {Route} from 'react-router-dom';
import MainScreenBooks from "./MainScreenBooks";

class BooksApp extends Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books
                }));
            })
    }

    bookShelfChanger = (event, updatedBook) => {
        const books = this.state.books
        const book  = books.filter((b) => {
            return b.id === updatedBook.id
        })
        book[0].shelf = event.target.value
        this.setState({
            books: books
        })
        console.log(event.target.value)
    }


    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <MainScreenBooks
                        bookShelfChanger = {this.bookShelfChanger}
                        books = {this.state.books}
                    />
                )}/>
                <Route path="/search" component={SearchInBooks}/>
            </div>
        )
    }
}

export default BooksApp
