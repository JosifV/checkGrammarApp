import React from "react";
import "./style/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="divSigniture">
        <p className="copyright-text">
          Test project &copy; 2019 Made by{" "}
          <a href="https://cv-josifv.firebaseapp.com/indexGreenEn.html">
            Josif Vacic.
          </a>
        </p>
      </div>

      <div className="divLinks">
        <ul className="ulSocial">
          <li>
            <a
              className="twitter"
              href="https://cv-josifv.firebaseapp.com/indexGreenEn.html"
            >
              <i className="fas fa-user-alt" />
            </a>
          </li>
          <li>
            <a className="facebook" href="https://www.facebook.com/iosif.vacic">
              <i className="fab fa-facebook-f" />
            </a>
          </li>
          <li>
            <a className="dribbble" href="https://github.com/JosifV">
              <i className="fab fa-github" />
            </a>
          </li>
          <li>
            <a
              className="linkedin"
              href="https://www.linkedin.com/in/josif-vaci%C4%87-657660165/"
            >
              <i className="fab fa-linkedin-in" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
