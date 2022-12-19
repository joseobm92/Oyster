import React, { useState } from "react";
// Import the `useParams()` hook
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import UpdateProjectForm from "../components/UpdateProjectForm";

import { QUERY_SINGLE_PROJECT, QUERY_ME } from "../utils/queries";
import { REMOVE_PROJECT } from "../utils/mutations";

const SingleProject = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { projectId } = useParams();
  const [isProjectFormShown, setIsProjectFormShown] = useState(false);
  const [removeProject, { error }] = useMutation(REMOVE_PROJECT, {});

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
        ],
      });

      console.log(data);
    } catch (error) {
      console.error("This is in the remove from favorites", error);
    }
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

  const addProjectHandleClick = () => {
    setIsProjectFormShown((current) => !current);
  };
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
        {Auth.loggedIn() ? (<>
         
            <div className='container'>

              <button onClick={addProjectHandleClick} className="btn btn-dark m-2">
                Update Project
              </button>
              <button
                onClick={() => removeProjectHandler(project._id)}
                class="btn btn-danger m-2"
              >
                Delete Project
              </button>
            </div>
          
        </>
        ) : (
          <div className='container m-2'>

          <Link
            className="btn custom-color"
            to={`/login`}
          >
            Join the discussion on this project.
          </Link>
          </div>
        )}

        {isProjectFormShown && <UpdateProjectForm projectId={projectId} />}

        {/* <Link
          className="btn custom-color btn-block btn-squared"
          to={`/projects/${project._id}`}
        >
          Join the discussion on this project.
        </Link> */}
      </div>
        <div className='container mt-2'>

          <div className="shadow">
            <CommentList comments={project.comments} />
          </div>
          <div className=" mt-3 p-4 rounded bg-white shadow" style={{ border: "1px dotted #1a1a1a" }}>
            <CommentForm projectId={project._id} />
          </div>
        </div>
    </div>
  );
};

export default SingleProject;
