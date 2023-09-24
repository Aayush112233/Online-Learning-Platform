import React from "react";
import "../assets/CSS/UnAuthorizedPage.css";
const UnAuthorizedPage = () => {
  return (
    <div class="base io">
      <h1 class="io">403</h1>
      <h2>Access forbidden</h2>
      <div class="link-container">
        <a href="/" class="more-link">
          Go To Home Page
        </a>
      </div>
    </div>
  );
};

export default UnAuthorizedPage;
