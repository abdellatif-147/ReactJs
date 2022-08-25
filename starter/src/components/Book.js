import * as BooksApi from "../BooksAPI";
import { useEffect, useState } from "react";

const Book = ({ book, selectBook }) => {
  const [shelf, setShelf] = useState("");
  useEffect(() => {
    const getBookbyId = async () => {
      let res = await BooksApi.get(book.id);
      setShelf(res.shelf);
    };
    getBookbyId();
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
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
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
export default Book;
