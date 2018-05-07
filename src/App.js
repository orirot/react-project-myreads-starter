import React from 'react';
import { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from "./ListBooks";
import SearchInBooks from "./SearchInBooks";
import {Route} from 'react-router-dom';

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

    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <ListBooks
                        books = {this.state.books}
                    />
                )}/>
                <Route path="/search" component={SearchInBooks}/>
            </div>
        )
    }
}

export default BooksApp
