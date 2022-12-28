import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { UPDATE_PROJECT } from "../utils/mutations";
import {
  QUERY_PROJECTS,
  QUERY_ME,
  QUERY_SINGLE_PROJECT,
} from "../utils/queries";

import Auth from "../utils/auth";

const UpdateProjectForm = ({ project }) => {
  const [projectName, setProjectName] = useState(project.name);
  const [projectSymbol, setProjectSymbol] = useState(project.symbol);
  const [projectSupply, setProjectSupply] = useState(project.supply);
  const [projectWebsite, setProjectWebsite] = useState(project.website);
  const [projectLogo, setProjectLogo] = useState(project.logo);
  const [projectAddress, setProjectAddress] = useState(project.address);

  const [characterCount, setCharacterCount] = useState(0);

  console.log("this is from the update project form", project);
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
          projectId: project._id,
        },
        refetchQueries: [
          {
            query: QUERY_SINGLE_PROJECT,
            variables: { projectId: project._id },
          },
        ],
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
      <h3>Update your current project</h3>

      {Auth.loggedIn() ? (
        <>
          {/* <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p> */}

                          <form onSubmit={handleFormSubmit}>
                  <div className=" form-floating mb-3 mt-3">
                    <input
                      type="projectName"
                      className="form-control"
                      id="floatingName"
                      name="projectName"
                      placeholder="Your Projects Name"
                      value={projectName}
                      onChange={handleChange}
                    ></input>
                    <label for="ProjectName" className="floatingName">
                      Project Name
                    </label>
                    <div id="projectNameHelp" className="form-text">
                      {" "}
                    </div>
                  </div>

                  <div className=" form-floating mb-3">
                    <input
                      type="symbol"
                      className="form-control"
                      id="floatingProjectSymbol"
                      name="projectSymbol"
                      placeholder="Project Symbol"
                      value={projectSymbol}
                      onChange={handleChange}
                    ></input>
                    <label for="symbol" className="floatingProjectSymbol">
                      Symbol
                    </label>
                  </div>

                  <div className=" form-floating mb-3">
                    <input
                      type="supply"
                      className="form-control"
                      id="floatingProjectSupply"
                      name="projectSupply"
                      placeholder="Total Supply"
                      value={projectSupply}
                      onChange={handleChange}
                    ></input>
                    <label for="supply" className="floatingProjectSupply">
                      Total Supply
                    </label>
                  </div>

                  <div className=" form-floating mb-3">
                    <input
                      type="website"
                      className="form-control"
                      id="floatingProjectWebsite"
                      name="projectWebsite"
                      placeholder="Website URL"
                      value={projectWebsite}
                      onChange={handleChange}
                    ></input>
                    <label for="website" className="floatingProjectWebsite">
                      Website URL
                    </label>
                  </div>

                  <div className=" form-floating mb-3">
                    <input
                      type="address"
                      className="form-control"
                      id="floatingProjectAddress"
                      name="projectAddress"
                      placeholder="Address"
                      value={projectAddress}
                      onChange={handleChange}
                    ></input>
                    <label for="address" className="floatingProjectAddress">
                      Address
                    </label>
                  </div>

                  <div className=" form-floating mb-3">
                    <input
                      type="logo"
                      className="form-control"
                      id="floatingProjectLogo"
                      name="projectLogo"
                      placeholder="Project Logo"
                      value={projectLogo}
                      onChange={handleChange}
                    ></input>
                    <label for="logo" className="floatingProjectLogo">
                      Logo
                    </label>
                  </div>

                  <button
                    className="btn btn-dark btn-block py-3"
                    type="submit"
                    data-bs-dismiss="modal"
                  >
                    Add Project
                  </button>
                </form>

{/* old one */}
          {/* <form
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
              <button
                className="btn btn-dark btn-block py-3"
                type="submit"
                data-bs-dismiss="modal"
              >
                Update Project
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form> */}
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
