import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

import Auth from "../utils/auth";

import { useQuery } from "@apollo/client";
import { QUERY_COLLECTION_FOR_ADDRESS } from "../utils/queries";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Nav = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div>
      <nav
        className="navbar bg-black navbar-expand-lg py-3 border-bottom"
        id="navStyling"
      >
        <div className="container">
          <Link to="/" className="navbar-brand text-white">
            <img className="logo" src={logo} alt="logo"></img>
            <span className="mx-3">OYSTER</span>
          </Link>
          <button
            className="custom- toggler navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="custom-toggler navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              {/* <li>
                <ConnectButton showBalance={false} />
              </li> */}
              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle text-white"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Collections
                </a>
                <ul className="dropdown-menu">
                  <Link
                    to="/collections/trending"
                    className="text-decoration-none"
                  >
                    <li>
                      <a className="dropdown-item">Trending</a>
                    </li>
                  </Link>
                  <Link
                    to="/collections/volume"
                    className="text-decoration-none"
                  >
                    <li>
                      <a className="dropdown-item">By Volume</a>
                    </li>
                  </Link>
                  <Link
                    to="/collections/sales"
                    className="text-decoration-none"
                  >
                    <li>
                      <a className="dropdown-item">By Sales</a>
                    </li>
                  </Link>
                </ul>
              </li>
              <li className="nav-item">
                {" "}
                <Link to="/projects" className="nav-link text-white">
                  Explore Projects
                </Link>
              </li>

              {Auth.loggedIn() ? (
                <>
                  <li className="nav-item">
                    <Link to="/me" className="nav-link text-white">
                      Dashboard
                    </Link>
                  </li>
                  <Link to="/" className="nav-link text-white ">
                    <li className=" nav-item text-white" onClick={logout}>
                      {" "}
                      Logout{" "}
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  <li className="nav-item ">
                    <Link to="/login" className="nav-link text-white ">
                      Login <i className="bi bi-box-arrow-in-left"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link text-white">
                      Sign Up <i className="bi bi-person-circle"></i>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container m-2">
        <ConnectButton showBalance={false} />
      </div>
    </div>
  );
};

export default Nav;
