import React from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import Watchlist from '../components/Watchlist';
import  Gallery  from '../components/Gallery';


import { QUERY_USER, QUERY_ME } from '../utils/queries';


import Auth from '../utils/auth';

const Profile = () => {
  const { userId } = useParams();

  console.log(userId);
  
  const { loading, data } = useQuery(userId ? QUERY_USER : QUERY_ME, {
    variables: { userId: userId },
  });

 
  console.log(data);

  console.log(Auth.getUser());

  const user = data?.me || data?.user || {};
  console.log(user);
//  navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getUser().data._id === userId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }



  return (
    <div className='container mt-4'>
      <h1>Dashboard <span className="text-primary"> </span></h1>
      <small>Welcome back,<span className="text-primary"> {user.username}  </span> </small>
      <Watchlist/>
      <Gallery/>
    </div>
  );
};

export default Profile;
