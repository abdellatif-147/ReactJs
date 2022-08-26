import * as BooksApi from "../BooksAPI";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Book = ({ book, selectBook }) => {
  const [shelf, setShelf] = useState("");
  const shelfOptions = [
    { id: 1, value: "move", text: "Move to...", disabled: true },
    { id: 2, value: "currentlyReading", text: "Currently Reading" },
    { id: 3, value: "wantToRead", text: "Want to Read" },
    { id: 4, value: "read", text: "Read" },
    { id: 5, value: "none", text: "None" },
  ];
  useEffect(() => {
    let mounted = true;
    const getBookbyId = async () => {
      if (mounted) {
        let res = await BooksApi.get(book.id);
        setShelf(res.shelf);
      }
    };
    getBookbyId();
    return () => {
      mounted = false;
    };
  }, [book.id]);
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              backgroundImage: `url(${
                book.imageLinks && book.imageLinks.thumbnail
              })`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              onChange={(e) => {
                setShelf(e.target.value);
                selectBook(e, book);
              }}
              value={shelf}
            >
              {shelfOptions.map((option) => {
                return (
                  <option
                    key={option.id}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.text}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book?.authors?.map((author) => {
          return (
            <div key={author} className="book-authors">
              {author}
            </div>
          );
        })}
      </div>
    </li>
  );
};
Book.propTypes = {
  book: PropTypes.object.isRequired,
  selectBook: PropTypes.func.isRequired,
};
export default Book;
