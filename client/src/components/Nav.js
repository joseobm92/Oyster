import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

import Auth from "../utils/auth";

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
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto ml-3 ">
            <li className="nav-item">
                <Link to="/collections" className="nav-link text-white">
                  Trending 
                </Link>
              </li>
              {Auth.loggedIn() ? (
                <>
                  <Link to="/" className="nav-link text-white ">
                    <li className=" nav-item text-white m-2" onClick={logout}>
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

             
              {/* <li className="nav-item ">
                <Link to='/login' className='nav-link text-white '>
                   Login  <i className="bi bi-house"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/signup' className='nav-link text-white'>
                  Sign Up <i className="bi bi-person-lines-fill"></i>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
