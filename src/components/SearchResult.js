import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "../css/SearchResult.css";

function SearchResult() {
  const location = useLocation();
  const history = useHistory();
  const recommendation = location.state.searchResult;
  const title = location.state.searchTitle;

  const bookDetailHandler = (book) => (e) => {
    e.preventDefault();
    console.log(book);
    history.push("/productdetails", {
      id: book["isbn"],
      author: book["author"],
      title: book["title"],
      page: book["page"],
      genre: book["genre"],
      image: book["image_url"],
      description: book["description"],
      rating: book["rating"],
      price: book["price"],
    });
  };

  return (
    <div className="search__container">
      {recommendation ? (
        <div>
          <div className="search title">Search result on "{title}":</div>
          {recommendation.map((book) => (
            <div className="card">
              <img
                className="bookcontiner__image"
                src={book["image_url"]}
                alt=""
                onClick={bookDetailHandler(book)}
              />
              <div
                className="bookcontainer__title"
                onClick={bookDetailHandler(book)}
              >
                <p>{book["title"]}</p>

                <p className="bookcontainer__price">NRP. {book["price"]}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="search__errmsg">No Book titled "{title}" Found!!!</p>
        </div>
      )}
    </div>
  );
}

export default SearchResult;
