import React from "react";
import { Link } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";

import { QUERY_ME } from "../utils/queries";
import { REMOVE_PROJECT } from "../utils/mutations";

const ProjectList = (projects) => {
  const projectList = projects.projects;
  console.log(projectList);

  const [removeProject, { error }] = useMutation(REMOVE_PROJECT, {});

  if (!projectList.length) {
    return <h3>No projects Yet</h3>;
  }

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

  return (
    <div>
      {projectList &&
        projectList.map((project) => (
          <div key={project._id} className="card mb-3">
            <h4 className="card-header custom-color text-light p-2 m-0">
              <Link className="text-light" to={`/user/${project._id}`}>
                {project.projectAuthor} <br />
                <span style={{ fontSize: "1rem" }}>
                  created this project on {project.createdAt}
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
              className="btn custom-color btn-squared text-white"
              to={`/projects/${project._id}`}
            >
              Join the discussion on this project.
            </Link>
            <button
              onClick={() => removeProjectHandler(project._id)}
              class="btn rounded delete-btn btn-dark"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default ProjectList;
