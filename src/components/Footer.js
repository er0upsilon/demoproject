import React from "react";
import "../css/Footerstyle.css";
import Facebook from "../images/Facebook.svg";
import Instagram from "../images/Instagram.svg";
import YouTube from "../images/YouTube.svg";
import LinkedIn from "../images/LinkedIn.svg";

function Footer() {
  return (
    <div className="footer__wrapper">
      <div className="first__line">
        <div className="footer-about">
          <h1 className="footer__h1">About</h1>
          <p className="footer__p1">
            BooksMandala is an online bookstore, physically based in Pokhara,
            Nepal, with an aim to create the largest community of book readers
            in Nepal.News and events At Booksmandala, you can browse and buy
            books online at the lowest everyday prices
          </p>
        </div>
        <div className="footer-links">
          <h1 className="footer__h1links">quick links</h1>
          <p className="footer__p1links">paragraph</p>
        </div>
        <div className="footer-subscribe">
          <h1 className="footer__h1suscribe">Subscribe</h1>
          <p className="footer__p1suscribe">paragraph</p>
        </div>
      </div>
      <div className="second__line">
        <p className="connect__title">Connect with us</p>
        <div className="footer__icons">
          <img className="Facebook__logo" src={Facebook} alt="Facebook" />
          <img className="instagram__logo" src={Instagram} alt="Instagram" />
          <img className="youtube__logo" src={YouTube} alt="YouTube" />
          <img className="LinkedIn__logo" src={LinkedIn} alt="LinkedIn" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
