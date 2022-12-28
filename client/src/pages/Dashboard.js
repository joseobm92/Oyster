import { React, useEffect, useState } from "react";
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

  const [isNftShown, setIsNftShown] = useState(false);
  const [isProjectListShown, setIsProjectListShown] = useState(false);

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
// display NFTs on your wallet
  const viewNFTsHandleClick = () => {
    setIsNftShown((current) => !current);
  };
// display project list
  const viewProjectListHandleClick = () => {
    setIsProjectListShown((current) => !current);
  };

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
{/* Bottons with add project, view your nfts, view your projects */}
      <button
        type="button"
        className="btn btn-dark m-2"
        data-bs-toggle="modal"
        data-bs-target="#formModal"
      >
        Add Project
      </button>
      <button onClick={viewNFTsHandleClick} className="btn btn-dark m-2">
        View Your NFTs
      </button>
      <button onClick={viewProjectListHandleClick} className="btn btn-dark m-2">
        View Your Projects
      </button>
      {isProjectListShown && <ProjectList projects={user.projects} />}
      {isNftShown && <Gallery />}

      {/* Modal */}
      <div
        className="modal fade"
        id="formModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add a Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ProjectForm />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
