import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Nav from '../components/Nav';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  /// HANDLE CHANGE ///
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  /// FORM SUBMISSION ///
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token, data.login.user._id);
    } catch (error) {
      console.log(error);
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div>
      {data ? (
        <p>Successfully logged in! You may now head{' '}<Link to='/'>back to the hompage.</Link></p>
      ) : (

        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-4 mt-5'>
              <h1> Log in</h1>
              <small className=''> Please make sure you visiting the correct URL</small>
              <form onSubmit={handleFormSubmit}>
                <div className=" form-floating mb-3 mt-3">
                  <input type="email" className="form-control" id="floatingEmail" name='email' placeholder='Your email' value={formState.email} onChange={handleChange}></input>
                  <label for="email" className="floatingEmail">Email address</label>
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className=" form-floating mb-3">
                  <input type="password" className="form-control" id="floatingPassword" name='password' placeholder='Your password' value={formState.password} onChange={handleChange}></input>
                  <label for="password" className="floatingPassword">Password</label>
                </div>

                <button type="submit" className="btn btn-dark mb-3">Submit</button>
                
              </form>
              <p className= ''>If you don't have an account please sign up here<Link to='/signup' className='text-decoration-none'> signup</Link></p>
            </div>

          </div>

        </div>



      )}
      {error && (
        <div>{error.message}</div>
      )}
    </div>
  );
};

export default Login;
