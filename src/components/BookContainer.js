import React from "react";
import "../css/BookComponent.css";
import { useHistory } from "react-router-dom";

function BookContainer({
  id,
  author,
  description,
  page,
  rating,
  title,
  genre,
  image,
  price,
}) {
  const history = useHistory();

  const bookDetailHandler = (e) => {
    e.preventDefault();
    history.push("/productdetails", {
      id: id,
      author: author,
      title: title,
      page: page,
      genre: genre,
      image: image,
      description: description,
      rating: rating,
      price: price,
    });
  };

  return (
    <div className="bookcontainer">
      <div className="card">
        <img
          className="bookcontiner__image"
          src={image}
          alt=""
          onClick={bookDetailHandler}
        />
        <div className="bookcontainer__title" onClick={bookDetailHandler}>
          <p>{title}</p>

          {/* <p className="bookcontainer__price">NRP. {price}</p> */}
        </div>
      </div>
    </div>
  );
}

export default BookContainer;
