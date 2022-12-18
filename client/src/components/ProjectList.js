import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";

import { QUERY_PROJECTS } from "../utils/queries";

const ProjectList = (projects) =>
  //   thoughts,
  //   title,
  // showTitle = true,
  // showUsername = true,
  {
    const projectList = projects.projects;
    console.log(projectList);
    // const { loading, data } = useQuery(QUERY_PROJECTS);
    // console.log(data);
    // const projects = data?.projects || [];

    if (!projectList.length) {
      return <h3>No projects Yet</h3>;
    }

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
            </div>
          ))}
      </div>
    );
  };

export default ProjectList;
