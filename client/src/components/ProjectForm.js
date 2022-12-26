import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_PROJECT } from "../utils/mutations";
import { QUERY_PROJECTS, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const ProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const [projectSymbol, setProjectSymbol] = useState("");
  const [projectSupply, setProjectSupply] = useState(0);
  const [projectWebsite, setProjectWebsite] = useState("");
  const [projectLogo, setProjectLogo] = useState("");
  const [projectAddress, setProjectAddress] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [addProject, { error }] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      try {
        const { projects } = cache.readQuery({ query: QUERY_PROJECTS });

        cache.writeQuery({
          query: QUERY_PROJECTS,
          data: { projects: [addProject, ...projects] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, projects: [...me.projects, addProject] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    parseInt(projectSupply);
    console.log(typeof projectSupply);

    try {
      const { data } = await addProject({
        variables: {
          name: projectName,
          address: projectAddress,
          logo: projectLogo,
          projectAuthor: Auth.getUser().data.username,
          website: projectWebsite,
          symbol: projectSymbol,
          supply: projectSupply,
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
    <div className="container m-3">
      {Auth.loggedIn() ? (
        <>
          <div className="container">
            <div className="row justify-content-center">
              <div>
                <h1> Want to collab with others? Add your project</h1>
                <small>
                  {" "}
                  Ready to take your project to the next level? share it and
                  interact with the community.
                </small>

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

                  <button className="btn btn-dark btn-block py-3" type="submit">
                    Add Project
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p> */}
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

export default ProjectForm;
