import React, { useState, useEffect } from "react";
import Subtotal from "./Subtotal";
import "../css/CartContainer.css";

function CartContainer() {
  const [cartItem, setCartItem] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    fetch("/profile/cart", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    }).then((res) => {
      res.json().then((r) => {
        if (res.status === 200) {
          console.log(res);
          console.log(r);
          const result = r ? Object.values(r) : null;
          console.log(result);
          setCartItem(result);
        } else {
          console.log(r["errmsg"]);
        }
      });
    });
  }, [reload]);

  const removefrombasket = (isbn) => (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem("userToken");

    fetch("/profile/removefromcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({
        isbn: isbn,
      }),
    }).then((res) => {
      res.json().then((r) => {
        if (res.status === 200) {
          console.log("successfull");
          setCartItem(null);
          setReload(!reload);
        } else {
          console.log(r["errmsg"]);
        }
      });
    });
  };

  return (
    <div className="cartcontainer">
      <div className="cartcontainer__left">
        <div className="cartcontainer__leftbox">
          <div className="card__header">
            <h2 className="cartcontainer__title">My Cart</h2>
          </div>
          {cartItem?.map((book) => (
            <div className="cart__items">
              <img className="cart__image" src={book["image_url"]} alt="" />
              <div className="cart__itemstitle">
                {book["title"]}
                <div className="cart__itemsbtn">
                  <button
                    onClick={removefrombasket(book["isbn"])}
                    className="cart__itemsremove"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="cart__itemsquantity">
                Quantity:{book["count"]}
              </div>
              <div className="cart__itemsprice">
                Price:{book["price"]}
                SubTotal: {book["price"]} x {book["count"]} =
                {parseInt(book["count"]) * parseInt(book["price"])}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cartcontainer__right">
        <Subtotal reload={reload} setReload={setReload} />
      </div>
    </div>
  );
}

export default CartContainer;
