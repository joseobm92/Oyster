import React from "react";

import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import UpdateProjectForm from "../components/UpdateProjectForm";

import {
  QUERY_SINGLE_PROJECT,
  QUERY_ME,
  QUERY_PROJECTS,
} from "../utils/queries";
import { REMOVE_PROJECT } from "../utils/mutations";

const SingleProject = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { projectId } = useParams();
  const [removeProject, { error }] = useMutation(REMOVE_PROJECT, {});
  const navigate = useNavigate();

  const removeProjectHandler = async (id) => {
    try {
      console.log("This is in remove from project func", id);

      const { data } = await removeProject({
        variables: {
          projectId: id,
        },
        refetchQueries: [
          {
            query: QUERY_ME,
          },
          {
            query: QUERY_PROJECTS,
          },
        ],
      });

      console.log(data);
    } catch (error) {
      console.error("This is in the remove from favorites", error);
    }
    navigate("/me");
  };

  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    // pass URL parameter
    variables: { projectId: projectId },
  });

  const project = data?.project || {};

  console.log(project);
  console.log(projectId);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mb-3 ">
      <div className="card mb-3 shadow">
        <h4 className="card-header custom-color text-light p-2">
          <Link className="text-light" to={`/user/${project._id}`}>
            {project.projectAuthor} <br />
            <span style={{ fontSize: "1rem" }}>
              Created this project on {project.createdAt}
            </span>
          </Link>
        </h4>
        <div className="card-body bg-light p-2">
          <p>Project Name: {project.name}</p>
          <p>Project Symbol: {project.symbol}</p>
          <p>Total Supply: {project.supply}</p>
          <p>
            Website:{" "}
            <a src={project.website} href="website">
              {project.website}
            </a>
          </p>
          <p>Address: {project.address}</p>
        </div>
        {Auth.loggedIn() &&
        Auth.getUser().data.username === project.projectAuthor ? (
          <>
            <div className="container">
              <button
                type="button"
                className="btn btn-dark m-2"
                data-bs-toggle="modal"
                data-bs-target="#formModal"
              >
                Update Project
              </button>

              <button
                onClick={() => removeProjectHandler(project._id)}
                className="btn btn-danger m-2"
              >
                {/* <Navigate to="/me" /> */}
                Delete Project
              </button>
            </div>
          </>
        ) : (
          <div className="container m-2">
            <Link className="btn custom-color" to={`/login`}>
              Join the discussion on this project.
            </Link>
          </div>
        )}
      </div>
      <div className="container mt-2">
        <div className="shadow">
          <CommentList comments={project.comments} />
        </div>
        <div
          className=" mt-3 p-4 rounded bg-white shadow"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <CommentForm projectId={project._id} />
        </div>
      </div>

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
                Update Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <UpdateProjectForm project={project} />
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

export default SingleProject;
