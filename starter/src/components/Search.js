import { Link } from "react-router-dom";
import Book from "./Book";
import PropTypes from "prop-types";
const Search = ({ selectBookfromSearch, searchResult, updateQuery, query }) => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            value={query}
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(event) => updateQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResult.map((book) => {
            return (
              <Book
                key={book.id}
                book={book}
                selectBook={selectBookfromSearch}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
};
Search.propTypes = {
  selectBookfromSearch: PropTypes.func.isRequired,
  searchResult: PropTypes.array.isRequired,
  updateQuery: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
}
export default Search;
