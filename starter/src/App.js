import "./App.css";
import ListBook from "./components/ListBook";
import Search from "./components/Search";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import * as BooksApi from "./BooksAPI";
function App() {
  const [shelves, setShelf] = useState({});
  const [Books, setBooks] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getAllbooks = async () => {
      const Books = await BooksApi.getAll();
      groupByShelf(Books);
    };
    getAllbooks();
  }, []);
  useEffect(() => {
    const getSearchData = async () => {
      let res = await BooksApi.search(query.trim(), 30);
      setSearchResult((Array.isArray(res) && res) || []);
    };
    getSearchData();
  }, [query, Books]);
  const selectBookfromList = async (e, book) => {
    book.shelf = e.target.value;
    BooksApi.update(book, e.target.value).then(() => {
      if(e.target.value === 'none'){
        groupByShelf([...Books.filter((b) => b.id !== book.id)]);
        return
      }
      groupByShelf([...Books.filter((b) => b.id !== book.id), book]);
    });
  };
  const selectBookfromSearch = async (e, item) => {
    await BooksApi.update(item, e.target.value);
    let Book = await BooksApi.get(item.id);
    groupByShelf([...Books, Book]);
  };
  const updateQuery = (q) => {
    setQuery(q);
  };
  const groupByShelf = (Books) => {
    let BooksGroupedByShelf = Books.reduce((obj, item) => {
      if (!obj[item.shelf]) {
        obj[item.shelf] = [];
      }
      obj[item.shelf].push(item);
      return obj;
    }, {});
    setBooks(Books);
    setShelf(BooksGroupedByShelf);
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          exact
          element={
            <ListBook
              selectBookfromList={selectBookfromList}
              shelves={shelves}
            />
          }
        />
        <Route
          path="/search"
          element={
            <Search
              selectBookfromSearch={selectBookfromSearch}
              searchResult={searchResult}
              updateQuery={updateQuery}
              query={query}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
