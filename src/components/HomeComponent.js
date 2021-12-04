import React from "react";
import "../css/HomeComponent.css";
import BookContainer from "./BookContainer";

function HomeComponent({
  topList,
  popularList,
  romanceList,
  horrorList,
  thrillerList,
  scifiList,
  fictionList,
  mysteryList,
}) {
  return (
    <div className="homeContainer">
      {topList &&
      popularList &&
      romanceList &&
      horrorList &&
      thrillerList &&
      scifiList &&
      fictionList &&
      mysteryList ? (
        <div className="homeElement">
          <div className="homecomp__group">
            <p className="group__title">Top Rated</p>
          </div>
          {topList.map((book) => (
            <BookContainer
              id={book["isbn"]}
              author={book["author"]}
              description={book["description"]}
              title={book["title"]}
              page={book["page"]}
              genre={book["genre"]}
              image={book["image_url"]}
              rating={book["rating"]}
              price={parseInt(book["price"])}
            />
          ))}

          <div className="homecomp__group">
            <p className="group__title">Top Selling</p>
          </div>
          {popularList.map((book) => (
            <BookContainer
              id={book["isbn"]}
              author={book["author"]}
              description={book["description"]}
              title={book["title"]}
              page={book["page"]}
              genre={book["genre"]}
              image={book["image_url"]}
              rating={book["rating"]}
              price={parseInt(book["price"])}
            />
          ))}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default HomeComponent;
