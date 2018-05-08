import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import BooksGrid from "./BooksGrid";
class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
    }


    render() {
        const { books } = this.props

        return (

            <div className="app">

                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Currently Reading</h2>
                                <div className="bookshelf-books">
                                    <BooksGrid books={books.filter((book)=>(
                                        book.shelf===("currentlyReading")
                                    ))}/>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Want to Read</h2>
                                <div className="bookshelf-books">
                                    <BooksGrid books={books.filter((book)=>(
                                        book.shelf===("wantToRead")
                                    ))}/>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Read</h2>
                                <div className="bookshelf-books">
                                    <BooksGrid books={books.filter((book)=>(
                                        book.shelf===("read")
                                    ))}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="open-search">
                        <a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
                        <Link to="/search" className="open-search">
                            Add a book
                        </Link>
                    </div>
                </div>


            </div>
        )
    }

}

export default ListBooks