import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { UPDATE_PROJECT } from "../utils/mutations";
import { QUERY_PROJECTS, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const UpdateProjectForm = (id) => {
  const [projectName, setProjectName] = useState("");
  const [projectSymbol, setProjectSymbol] = useState("");
  const [projectSupply, setProjectSupply] = useState("");
  const [projectWebsite, setProjectWebsite] = useState("");
  const [projectLogo, setProjectLogo] = useState("");
  const [projectAddress, setProjectAddress] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  console.log("this is from the update project form", id);
  const [updateProject, { error }] = useMutation(UPDATE_PROJECT, {
    // update(cache, { data: { updateProject } }) {
    //   try {
    //     const { projects } = cache.readQuery({ query: QUERY_PROJECTS });
    //     cache.writeQuery({
    //       query: QUERY_PROJECTS,
    //       data: { projects: [updateProject, ...projects] },
    //     });
    //   } catch (e) {
    //     console.error(e);
    //   }
    //   // update me object's cache
    //   const { me } = cache.readQuery({ query: QUERY_ME });
    //   cache.writeQuery({
    //     query: QUERY_ME,
    //     data: { me: { ...me, projects: [...me.projects, updateProject] } },
    //   });
    // },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    parseInt(projectSupply);
    console.log(typeof projectSupply);

    try {
      const { data } = await updateProject({
        variables: {
          name: projectName,
          address: projectAddress,
          logo: projectLogo,
          projectAuthor: Auth.getUser().data.username,
          website: projectWebsite,
          symbol: projectSymbol,
          supply: projectSupply,
          projectId: id.projectId,
        },
      });

      setProjectName("");
      setProjectSymbol("");
      setProjectSupply("");
      setProjectAddress("");
      setProjectLogo("");
      setProjectWebsite("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "projectName") {
      setProjectName(value);
    }
    if (name === "projectSymbol") {
      setProjectSymbol(value);
    }
    if (name === "projectWebsite") {
      setProjectWebsite(value);
    }
    if (name === "projectAddress") {
      setProjectAddress(value);
    }
    if (name === "projectLogo") {
      setProjectLogo(value);
    }
    if (name === "projectSupply") {
      setProjectSupply(value);
    }
  };

  return (
    <div>
      <h3>Want to Collab with others? Add your project</h3>

      {Auth.loggedIn() ? (
        <>
          {/* <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p> */}
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="projectName"
                placeholder="Your Project's Name"
                value={projectName}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="projectSymbol"
                placeholder="Symbol"
                value={projectSymbol}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="projectSupply"
                type="number"
                placeholder="Total Supply"
                value={projectSupply}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="projectWebsite"
                placeholder="Website"
                value={projectWebsite}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="projectAddress"
                placeholder="Address"
                value={projectAddress}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="projectLogo"
                placeholder="Logo"
                value={projectLogo}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Update Project
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in share a project. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default UpdateProjectForm;
