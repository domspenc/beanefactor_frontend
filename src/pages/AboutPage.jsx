import React from "react";
import "../styles/aboutpage.css";

function AboutPage() {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p>
        Beanefactor is a platform where users can create projects and pledge
        treats to make the world a better place for dogs.
      </p>
      <div className="about-image">
        <img
          src="https://via.placeholder.com/600x400"
          alt="About Beanefactor"
        />
      </div>
    </div>
  );
}

export default AboutPage;
