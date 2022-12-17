import { React, useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Watchlist from "../components/Watchlist";
import Gallery from "../components/Gallery";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";
import loadingImg from "../images/loading.json";
import Lottie from "lottie-react";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

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

  useEffect(() => {
    console.log("test");
  }, [data]);
  //  navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getUser().data._id === userId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return (
      <div>
        <Lottie loop={true} animationData={loadingImg} />
      </div>
    );
  }

  if (!user?.username) {
    return (
      <div className="container">
        <h4>
          You need to be logged in to see this. Use the navigation links above
          to sign up or log in!
        </h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>
        Dashboard <span className="text-primary"> </span>
      </h1>
      <small>
        Welcome back,<span className="text-primary"> {user.username} </span>{" "}
      </small>
      <Watchlist />
      <ProjectForm />
      <ProjectList/>
      <Gallery />
    </div>
  );
};

export default Profile;
