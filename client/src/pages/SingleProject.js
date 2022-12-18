import React from "react";
// Import the `useParams()` hook
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

import { QUERY_SINGLE_PROJECT } from "../utils/queries";

const SingleProject = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { projectId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    // pass URL parameter
    variables: { projectId: projectId },
  });

  const project = data?.project || {};

  console.log(project);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <div className="card mb-3">
        <h4 className="card-header custom-color text-light p-2 m-0">
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
        <Link
          className="btn custom-color btn-block btn-squared"
          to={`/projects/${project._id}`}
        >
          Join the discussion on this project.
        </Link>
        <div className="my-5">
          <CommentList comments={project.comments} />
        </div>
        <div className="m-3 p-4" style={{ border: "1px dotted #1a1a1a" }}>
          <CommentForm projectId={project._id} />
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
