import "./App.css";
import ListBook from "./components/ListBook";
import Search from "./components/Search";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import * as BooksApi from "./BooksAPI";
function App() {
  const [shelves, setShelf] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getAllbooks = async () => {
      const Books = await BooksApi.getAll();
      let BooksGroupedByShelf = Books.reduce((obj, item) => {
        if (!obj[item.shelf]) {
          obj[item.shelf] = [];
        }
        obj[item.shelf].push(item);
        return obj;
      }, {});
      setShelf(BooksGroupedByShelf);
    };
    getAllbooks();
  }, []);
  useEffect(() => {
    const getSearchData = async () => {
      let res = await BooksApi.search(query, 30);
      let Books = Array.isArray(res) ? res : [];
      setSearchResult(Books || []);
    };
    getSearchData();
  }, [query]);
  const selectBookfromList = async (e, book) => {
    let newShelves = { ...shelves };
    let index = newShelves[book.shelf]?.indexOf(book);
    if (e.target.value === "none") {
      newShelves[book.shelf].splice(index, 1);
      await BooksApi.update(book, e.target.value);
      setShelf(newShelves);
      return;
    }
    newShelves[book.shelf].splice(index, 1);
    book.shelf = e.target.value;
    newShelves[e.target.value].push(book);
    BooksApi.update(book, e.target.value);
    setShelf(newShelves);
  };
  const selectBookfromSearch = async (e, item) => {
    let newShelves = { ...shelves };
    if (e.target.value === "none") {
      let removeSearchBook = searchResult.filter((book) => item.id !== book.id);
      setSearchResult(removeSearchBook);
      return;
    }
    await BooksApi.update(item, e.target.value);
    let Book = await BooksApi.get(item.id);
    newShelves[e.target.value]?.push(Book);
    setShelf(newShelves);
  };
  const updateQuery = (q) => {
    setQuery(q.trim());
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
