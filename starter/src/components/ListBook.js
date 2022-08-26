import Book from "./Book";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const ListBook = ({ selectBookfromList, shelves }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(shelves).map((shelf) => {
            return (
              <div className="bookshelf" key={shelf}>
                <h2 className="bookshelf-title">{shelf}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {shelves[shelf]?.map((book) => {
                      return (
                        <Book
                          key={book.id}
                          book={book}
                          selectBook={selectBookfromList}
                        />
                      );
                    })}
                  </ol>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      }
    </div>
  );
};
ListBook.propTypes = {
  selectBookfromList: PropTypes.func.isRequired,
  shelves: PropTypes.object.isRequired,
};
export default ListBook;
