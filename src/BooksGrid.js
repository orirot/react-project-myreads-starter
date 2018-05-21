import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BooksGrid extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        bookShelfChanger: PropTypes.func.isRequired,
        getBookShelf: PropTypes.func.isRequired,
    }

    static shelfToOptionIndexMap = {
        'currentlyReading' : '0',
        'wantToRead' : '1',
        'read' : '2',
        'none' : '3',
    };

    render() {
        const { books , bookShelfChanger, getBookShelf} = this.props
        return (
            <div className="app">
                {books && books.length > 0 && (
                    <ol className="books-grid">
                        {books.map((book)=>(
                            // console.log("get book shelf: " + getBookShelf(book.id)) ||
                        <li key ={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{
                                        width: 128,
                                        height: 193,
                                        backgroundImage: book.imageLinks && `url(${book.imageLinks.thumbnail})`
                                        // backgroundImage: `url(${book.imageLinks.thumbnail})`
                                    }}/>
                                    <div className="book-shelf-changer">
                                        <select value={getBookShelf(book.id)} onChange={(event) => (bookShelfChanger(event,book))}>
                                            <option value="none" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                {book.authors && <div className="book-authors">{book.authors[0]}</div>}
                            </div>
                        </li>))}
                    </ol>)}
            </div>
        )
    }

}

export default BooksGrid