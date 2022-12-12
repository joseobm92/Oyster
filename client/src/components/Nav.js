import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <nav className="navbar bg-dark navbar-expand-lg py-3 mb-4" id='navStyling'>
        <div className="container">
          <Link to='/' className='navbar-brand text-white'>

            <a> LOGO </a>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu"><span
            className="navbar-toggler-icon"></span></button>

          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto ml-3 ">
              <li className="nav-item ">
                <Link to='/login' className='nav-link text-white '>
                  <a > Login  <i className="bi bi-house"></i>  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/signup' className='nav-link text-white'>
                  <a >Sign Up <i className="bi bi-person-lines-fill"></i></a>
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>


    </div>

  )
};

export default Nav;
