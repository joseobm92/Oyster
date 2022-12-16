import React from "react";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer p-5 bg-black text-white text-center position-relative">
      <div className="container">
        {/* <p className="">Copyright &copy; 2022 by The Serial Coders</p> */}
        {/* <a href="#" className="position-absolute bottom-0 end-0 ">
          <i className="bi bi-arrow-up-circle h1"></i>
        </a> */}
        <div className="row">
          <div className="col-md-4">
            <h5>Collections</h5>
            <ul className="list-unstyled text-decoration-none">
              <Link
                to="/collections/trending"
                className="text-decoration-none text-muted"
              >
                <li> Trending</li>
              </Link>
              <Link
                to="/collections/sales"
                className="text-decoration-none text-muted"
              >
                <li> By Sales</li>
              </Link>
              <Link
                to="/collections/volume"
                className="text-decoration-none text-muted"
              >
                <li> By Volume</li>
              </Link>
            </ul>
            <h5>Watch</h5>
            <ul className="list-unstyled text-decoration-none">
              <Link
                to="/me"
                className="text-decoration-none  text-muted">
                <li> Watchlist </li>
              </Link>
             
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Company</h5>
            <ul className="list-unstyled text-decoration-none">
            <a href="mailto:email@example.com" className="text-decoration-none text-white text-muted">Contact us</a>

              <Link to="" className="text-decoration-none text-muted">
                <li> Roadmap</li>
              </Link>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Resources</h5>
            <ul className="list-unstyled text-decoration-none">
              <Link to="" className="text-decoration-none text-muted">
                <li> FAQ </li>
              </Link>
              <a href="mailto:email@example.com" className="text-decoration-none text-white text-muted">Pricing</a>
            </ul>
          </div>
        </div>
        <p className="">Copyright &copy; 2022 by The Serial Coders</p>
        <a href="#" className="position-absolute bottom-0 end-0 ">
          <i className="bi bi-arrow-up-circle h1"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
