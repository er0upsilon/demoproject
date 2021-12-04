import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CartContainer from "./components/CartContainer";
import Footer from "./components/Footer";
import HomeComponent from "./components/HomeComponent";
import LoginPage from "./components/LoginPage";
import NavBarComponent from "./components/NavbarComponent";
import ProductDetails from "./components/ProductDetails";
import PurchaseHistory from "./components/PurchaseHistory";
import RegistrationPage from "./components/RegistrationPage";
import SearchResult from "./components/SearchResult";
// import SearchBooks from "./components/SearchBooks";

function App() {
  const [topList, setTopList] = useState(null);
  const [popularList, setPopularList] = useState(null);
  const [fictionList, setFictionList] = useState(null);
  const [romanceList, setRomanceList] = useState(null);
  const [horrorList, setHorrorList] = useState(null);
  const [mysteryList, setMysteryList] = useState(null);
  const [scifiList, setScifiList] = useState(null);
  const [thrillerList, setThrillerList] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [countcart, setCountcart] = useState(0);
  useEffect(() => {
    setUserToken(localStorage.getItem("userToken"));
    fetch("/books/gettopbooks?count=5")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        setTopList(result);
      });
    fetch("/profile/cartcount", {
      method: "GET",

      headers: { Authorization: "Bearer " + userToken },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCountcart(data["count"]);
      });
    fetch("/books/getmostpopular?count=5")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        setPopularList(result);
      });

    fetch("/books/gettopfiction?count=5")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        setFictionList(result);
      });

    fetch("/books/gettopromance?count=5")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        setRomanceList(result);
      });

    fetch("/books/gettophorror?count=5")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        setHorrorList(result);
      });

    fetch("/books/gettopmystery?count=5")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        setMysteryList(result);
      });

    fetch("/books/gettopthriller?count=5")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        setThrillerList(result);
      });

    fetch("/books/gettopscifi?count=5")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const result = Object.values(data);
        setScifiList(result);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/checkout">
            <NavBarComponent
              userToken={userToken}
              setUserToken={setUserToken}
              countcart={countcart}
              setCountcart={setCountcart}
            />
            <CartContainer />
            <Footer />
          </Route>
          <Route path="/productdetails">
            <NavBarComponent
              userToken={userToken}
              setUserToken={setUserToken}
              countcart={countcart}
              setCountcart={setCountcart}
            />
            <ProductDetails />
            <Footer />
          </Route>
          <Route path="/searchresult">
            <NavBarComponent
              userToken={userToken}
              setUserToken={setUserToken}
              countcart={countcart}
              setCountcart={setCountcart}
            />
            <SearchResult />
            <Footer />
          </Route>
          <Route path="/purchasehistory">
            <NavBarComponent
              userToken={userToken}
              setUserToken={setUserToken}
              countcart={countcart}
              setCountcart={setCountcart}
            />
            <PurchaseHistory />
            <Footer />
          </Route>
          <Route path="/register">
            <RegistrationPage />
          </Route>
          <Route path="/">
            <NavBarComponent
              countcart={countcart}
              setCountcart={setCountcart}
            />
            <HomeComponent
              topList={topList}
              popularList={popularList}
              romanceList={romanceList}
              horrorList={horrorList}
              thrillerList={thrillerList}
              scifiList={scifiList}
              fictionList={fictionList}
              mysteryList={mysteryList}
            />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
