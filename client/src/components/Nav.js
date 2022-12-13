import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const Nav = () => {
  return (
    <div>
      <nav className="navbar bg-dark navbar-expand-lg py-3 mb-4" id='navStyling'>
        <div className="container">
          <Link to='/' className='navbar-brand text-white'>
          <img className="logo" src={logo} alt='logo'></img>
          <span className='mx-3'>OYSTER</span>    
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu"><span
            className="navbar-toggler-icon"></span></button>

          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto ml-3 ">
              <li className="nav-item ">
                <Link to='/login' className='nav-link text-white '>
                   Login  <i className="bi bi-house"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/signup' className='nav-link text-white'>
                  Sign Up <i className="bi bi-person-lines-fill"></i>
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
