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

    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <MainScreenBooks
                        books = {this.state.books}
                    />
                )}/>
                <Route path="/search" component={SearchInBooks}/>
            </div>
        )
    }
}

export default BooksApp
