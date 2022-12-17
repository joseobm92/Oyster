import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";

import { QUERY_PROJECTS } from "../utils/queries";

const ProjectList = () =>
  //   thoughts,
  //   title,
  // showTitle = true,
  // showUsername = true,
  {
    const { loading, data } = useQuery(QUERY_PROJECTS);
    console.log(data);
    const projects = data?.projects || [];

    if (!projects.length) {
      return <h3>No projects Yet</h3>;
    }

    return (
      <div>
        {projects &&
          projects.map((project) => (
            <div key={project._id} className="card mb-3">
              <h4 className="card-header bg-primary text-light p-2 m-0">
                <Link className="text-light" to={`/user/${project._id}`}>
                  {project.projectAuthor} <br />
                  <span style={{ fontSize: "1rem" }}>
                    created this project on {project.createdAt}
                  </span>
                </Link>
              </h4>
              <div className="card-body bg-light p-2">
                <p>{project.name}</p>
                <p>{project.symbol}</p>
                <p>{project.supply}</p>
                <p>{project.website}</p>
                <p>{project.symbol}</p>
              </div>
              <Link
                className="btn btn-primary btn-block btn-squared"
                to={`/projects/${project._id}`}
              >
                Join the discussion on this project.
              </Link>
            </div>
          ))}
      </div>
    );
  };

export default ProjectList;
