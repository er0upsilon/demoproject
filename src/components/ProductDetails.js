import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/ProductDetails.css";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import { useHistory } from "react-router-dom";

function ProductDetails() {
  const location = useLocation();
  const history = useHistory();
  const [volume, setVolume] = useState(1);
  const [recommendation, setRecommendation] = useState(null);
  const [id, setId] = useState(location.state.id);
  const [title, setTitle] = useState(location.state.title);
  const [image, setImage] = useState(location.state.image);
  const [price, setPrice] = useState(location.state.price);
  const [description, setDescription] = useState(location.state.description);
  const [genre, setGenre] = useState(location.state.genre);
  const [author, setAuthor] = useState(location.state.author);
  const [rating, setRating] = useState(location.state.rating);
  const [page, setPage] = useState(location.state.page);

  console.log(location.state.title);
  useEffect(() => {
    fetch("/recommendation/getrecommendation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        count: 4,
        title: title,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        setRecommendation(result);
      });
  }, [title]);

  const bookDetailHandler = (book) => (e) => {
    e.preventDefault();
    setId(book["isbn"]);
    setAuthor(book["author"]);
    setTitle(book["title"]);
    setPage(book["page"]);
    setGenre(book["genre"]);
    setImage(book["image_url"]);
    setDescription(book["description"]);
    setRating(book["rating"]);
    setPrice(book["price"]);
  };

  const addToBasket = (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem("userToken");

    fetch("/profile/addtocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({
        isbn: id,
        count: volume,
      }),
    }).then((res) => {
      res.json().then((r) => {
        if (res.status === 200) {
          setVolume(1);
        } else {
          alert(r["errmsg"]);
        }
      });
    });
  };

  const volumeincreaseHandler = (e) => {
    e.preventDefault();
    setVolume(volume + 1);
  };

  const volumedecreaseHandler = (e) => {
    e.preventDefault();

    volume ? setVolume(volume - 1) : setVolume(0);
  };
  return (
    <div className="productdetails">
      <div className="productdetailswrapper">
        <div className="productdetails__infoimage">
          <img className="productdetails__image" src={image} alt="" />
        </div>
        <div className="productdetails__info">
          <div className="productdetails__infotitle">{title}</div>

          <div className="productdetails__infoauthor">
            <p>By {author},</p>
          </div>

          <div className="productdetails__infogenre">
            <p>Genre: {genre}</p>
          </div>
          <p className="productdetails__synopsis">Synopsis</p>
          <div className="productdetails__infodesc">
            <p>{description}</p>
          </div>
        </div>
        <div className="productdetails__infobutton">
          <div className="productdetails__infobuttonbox">
            <div className="productdetails__infoprice">
              NRP. {price * volume}
            </div>
            <div className="productdetails__infoquantity">
              <div className="productdetails__icon">
                <BiChevronLeftCircle
                  size={25}
                  className="productdetails__icon"
                  onClick={volumedecreaseHandler}
                />
              </div>
              <input
                type="text"
                className="productdetails__inputquantity"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              />
              <div className="productdetails__icon">
                <BiChevronRightCircle
                  size={25}
                  onClick={volumeincreaseHandler}
                />
              </div>
            </div>
            <button
              className="productdetails__cartbutton"
              onClick={addToBasket}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <div className="productdetails_recomtitle">
        Products Recommended for you
      </div>
      <div className="productdetail__recommendation">
        {recommendation?.map((book) => (
          <div className="productdetail__recommendationcard">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;
