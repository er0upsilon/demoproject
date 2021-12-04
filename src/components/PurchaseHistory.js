import React, { useState, useEffect } from "react";
import "../css/PurchaseHistory.css";

function PurchaseHistory() {
  const [purchaseItem, setpurchaseItem] = useState(null);
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    fetch("/profile/purchasehistory", {
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
          setpurchaseItem(result);
        } else {
          console.log(r["errmsg"]);
        }
      });
    });
  }, []);

  return (
    <div className="PurchaseHistory">
      <div className="PurchaseHistory__left">
        {purchaseItem ? (
          <div className="PurchaseHistory__leftbox">
            <div className="card__header">
              <h2 className="PurchaseHistory__title">My purchase</h2>
            </div>
            {purchaseItem?.map((book) => (
              <div className="purchase__items">
                <img
                  className="purchase__image"
                  src={book["image_url"]}
                  alt=""
                />
                <div className="purchase__itemstitle">
                  {book["title"]}
                  <div className="purchase__itemsbtn">
                    {/* {

                      date = new Date(book["date"]);} */}
                  </div>
                </div>

                <div className="purchase__itemsquantity">
                  Quantity:{book["count"]}
                </div>
                <div className="purchase__itemsprice">
                  Price:{book["price"]}
                  SubTotal: {book["price"]} x {book["count"]} =
                  {parseInt(book["count"]) * parseInt(book["price"])}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="subtotal__errmsg">not ordered anything</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PurchaseHistory;
