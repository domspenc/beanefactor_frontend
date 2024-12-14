// src/components/Footer.jsx

import React from "react";
import "./footer.css"; // You can create a CSS file for styling the footer

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2024 Dominique Spencer. All rights reserved.</p>
      <p>
        Connect with me on{" "}
        <a
          href="https://www.linkedin.com/in/dominiquespencer"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        .
      </p>
    </footer>
  );
}

export default Footer;
