import React from "react";
import { Link } from "react-router-dom";
import ProjectList from "../components/ProjectList";
import { useQuery } from "@apollo/client";

import { QUERY_PROJECTS } from "../utils/queries";

const Projects = () => {
  const { loading, data } = useQuery(QUERY_PROJECTS);
  console.log(data);
  
  const projects = data?.projects || [];
  console.log(projects);

  if (loading) return "Loading...";

  if (!projects.length) {
    return <h3>No projects Yet</h3>;
  }

  return (
    <div className="container">
      <ProjectList projects={projects} />
    </div>
  );
};

export default Projects;
