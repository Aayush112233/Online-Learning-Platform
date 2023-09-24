import React from "react";
import "../assets/CSS/NotFound.css";
const NotFound = () => {
  return (
    <>
      <h1 className="Head">Oops! </h1>
      <p class="zoom-area"> Page Not Found </p>
      <section class="error-container">
        <span class="four">
          <span class="screen-reader-text">4</span>
        </span>
        <span class="zero">
          <span class="screen-reader-text">0</span>
        </span>
        <span class="four">
          <span class="screen-reader-text">4</span>
        </span>
      </section>
      <div class="link-container">
        <a href="/" class="more-link">
          Go To Home Page
        </a>
      </div>
    </>
  );
};

export default NotFound;
