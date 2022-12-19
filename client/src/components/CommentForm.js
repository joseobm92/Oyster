import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_COMMENT } from "../utils/mutations";

import Auth from "../utils/auth";

const CommentForm = ({ projectId }) => {
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          projectId,
          commentText,
          commentAuthor: Auth.getUser().data.username,
        },
      });

      setCommentText("");
      setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "commentText" && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className='container bg-white'>
      <h4>Add a comment to this current Project...</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Comment length: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>

          <form onSubmit={handleFormSubmit}>

                <div className=" form-floating mb-3 mt-3">

                  <input type="commentText" className="form-control" id="floatingCommentText" name='commentText' placeholder='Add your comment' value={commentText} onChange={handleChange}></input>
                  <label for="commentText" className="floatingCommentText">Your comment</label>
                  <div id="projectNameHelp" className="form-text"> </div>
                </div>


                <button className="btn btn-dark py-3" type="submit">
                Add Comment
              </button>
                
              </form>

          {/* <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn custom-color btn-block py-3" type="submit">
                Add Comment
              </button>
            </div>
          </form> */}
        </>
      ) : (
        <p>
          You need to be logged in to add a comment. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;
