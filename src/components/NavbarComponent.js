import "../css/NavbarComponent.css";
import { BiSearch } from "react-icons/bi";
import { IoBagHandleSharp } from "react-icons/io5";
import { useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiHistory } from "react-icons/bi";

const NavBarComponent = ({ refresh, setRefresh }) => {
  const [username, setUsername] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const history = useHistory();
  const [countCart, setCountcart] = useState(0);
  const searchHandler = (e) => {
    let searchData = null;
    e.preventDefault();
    fetch("recommendation/search?title=" + searchTitle)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        searchData = result;
        console.log(searchData);
        setSearchTitle("");
        searchData
          ? history.push("/searchresult", {
              searchResult: searchData,
              searchTitle: searchTitle,
            })
          : console.log("empty");
      });
  };

  const authenticateHandler = (e) => {
    const userToken = localStorage.getItem("userToken");
    fetch("/auth/logout", {
      method: "GET",
      headers: { Authorization: "Bearer " + userToken },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUsername();
      });
    localStorage.removeItem("userToken");
    console.log(localStorage.getItem("userToken"));
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      fetch("/auth/getcurrentuser", {
        method: "GET",
        headers: { Authorization: "Bearer " + userToken },
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setUsername(data["username"]);
        });
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
            console.log(result?.length);
            setCountcart(result?.length);
          } else {
            console.log(r["errmsg"]);
          }
        });
      });
    }
  }, [refresh]);

  return (
    <div className="navbar">
      <Link to="/" className="link">
        <div className="navbar__intro">
          <span className="navbar__title">THE BOOKSTORE</span>
        </div>
      </Link>
      <div className="navbar__serach">
        <div className="navbar__searchInput">
          <form onSubmit={searchHandler}>
            <input
              className="navbarsearch__field"
              type="text"
              placeholder="Search"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </form>
        </div>
        <BiSearch
          className="navbar__searchIcon"
          onClick={searchHandler}
        ></BiSearch>
      </div>

      <div className="navbar__nav">
        <Link to={!username && "/login"} className="link">
          <div onClick={authenticateHandler} className="navbar__option">
            <span className="navbar__optionLineOne">
              Hello {username ? username : "Guest"}
            </span>
            <span className="navbar__optionLineTwo">
              {username ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="/checkout" className="link">
          <div className="navbar__optionBasket">
            <IoBagHandleSharp className="basket__logo" size={30} />
            <span className="navbar__basketCount">
              {countCart ? countCart : 0}
            </span>
          </div>
        </Link>

        <Link to={username && "/purchasehistory"} className="link">
          <div className="navbar__optionhis">
            <BiHistory className="history__logo" size={30} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBarComponent;
