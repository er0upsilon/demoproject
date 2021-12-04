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
            The BOOKSTORE is a one-stop solution for all your books need, where
            you can browse through thousands of books. With an aim to create the
            largest community of book readers in Nepal, we have included many
            features like: dyanamic recommendation etc.
          </p>
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
