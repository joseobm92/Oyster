import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Nav from '../components/Nav'

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  /// UPDATES STATE BASED ON INPUT ///
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  /// HANDLE SUBMISSION OF FORM ///
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token, data.addUser.user._id);
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <main>
       <Nav/>
      {data ? (
        <p variant='subtitle1'>Successfully created an account. You may now head{' '}<Link to='/'>back to the hompage.</Link></p>
      ) : (
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-4'>
              <h1>Sign up</h1>
        <form onSubmit={handleFormSubmit}>
        <div className="form-floating mb-3">
            <input type="username" className="form-control" id="floatingInput" name='username' placeholder='Your username' value={formState.username} onChange={handleChange}></input>
            <label for="username" className="floatingInput">Username</label>
          </div>
          <div className=" form-floating mb-3">
            <input type="email" className="form-control" id="floatingEmail" name='email' placeholder='Your email' value={formState.email} onChange={handleChange}></input>
            <label for="email" className="floatingfloatingEmail">Email address</label>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="floatingPassword" name='password' placeholder='Your password' value={formState.password} onChange={handleChange}></input>
            <label for="password" className="floatingPassword">Password</label>
          </div>

          <button type="submit" className="btn btn-dark">Submit</button>
        </form>

            </div>

          </div>

        </div>
        // <div>
        //   <h2>Sign Up</h2>
        //   <form onSubmit={handleFormSubmit}>
        //     <input
        //       placeholder='Username'
        //       name='username'
        //       type='text'
        //       value={formState.username}
        //       onChange={handleChange}
        //     />
        //     <input
        //       placeholder='Email'
        //       name='email'
        //       type='text'
        //       value={formState.email}
        //       onChange={handleChange}
        //     />
        //     <input
        //       placeholder='Password'
        //       name='password'
        //       type='password'
        //       value={formState.password}
        //       onChange={handleChange}
        //     />
        //     <button type='submit'>Sign Up</button>
        //   </form>
        // </div>
      )}
      {error && (
        <div>
          {error.message}
        </div>
      )}
    </main>
  );
};

export default Signup;
