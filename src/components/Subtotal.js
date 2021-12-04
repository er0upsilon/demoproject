import React, { useState, useEffect } from "react";
import "../css/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";

function Subtotal({ reload, setReload }) {
  const [cartItem, setCartItem] = useState(null);
  const [checked, setChecked] = useState(false);
  const history = useHistory();
  const checkoutHandller = (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem("userToken");

    fetch("/profile/buybook", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    }).then((res) => {
      res.json().then((r) => {
        if (res.status === 200) {
          alert("purchase successfull");
          history.push("/");
        } else {
          alert(r["errmsg"]);
        }
      });
    });
  };
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
          setCartItem(null);
          console.log(r["errmsg"]);
        }
      });
    });
  }, [reload]);

  const handleChange = (e) => {
    e.preventDefault();
    setChecked(!checked);
  };
  return (
    <div className="subtotal">
      {cartItem ? (
        <div>
          <CurrencyFormat
            renderText={(value) => (
              <>
                <p>
                  Total ({cartItem?.length} items): <strong>{value}</strong>
                </p>
                <div className="subtotal__gift" onClick={handleChange}>
                  {checked ? (
                    <p className="subtotal__info">+ NRS 15 for gift wrapper </p>
                  ) : (
                    ""
                  )}
                  <button
                    className="subtotal__giftbutton"
                    onClick={handleChange}
                  >
                    This order contains gift
                  </button>
                </div>
              </>
            )}
            decimalScale={2}
            value={
              checked
                ? cartItem?.reduce(
                    (amount, item) => item.price * item.count + amount,
                    15
                  )
                : cartItem?.reduce(
                    (amount, item) => item.price * item.count + amount,
                    0
                  )
            }
            displayType={"text"}
            thousandSeparator={true}
            prefix={"NPR "}
          />
          <button className="subtotal__button" onClick={checkoutHandller}>
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <div>
          <p className="subtotal__errmsg">
            Cart Empty!!!! Please add items!!!!
          </p>
        </div>
      )}
    </div>
  );
}

export default Subtotal;
