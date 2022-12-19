import React from "react";

const CommentList = ({ comments = [] }) => {
  console.log(comments[0]);
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <>
      <div className='container bg-white border rounded'>

        {/* <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: "1px dotted #1a1a1a" }}
      >
        Comments
      </h3> */}
        <div className="row">
          <h3
            className="p-3 "
          // style={{ borderBottom: "1px dotted #1a1a1a" }}
          >
            Comments
          </h3>
          {comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3">
              <div className="border rounded bg-white">
                <h5 className="card-header custom-color text-light p-3">
                  {comment.commentAuthor} commented:{" "}
                 
                </h5>
                <div className='card-body p-3 border'>
                <p className="">{comment.commentText}</p>

                </div>
                
                <p className='text-end px-3'> created on <span className='text-watning'>{comment.createdAt} </span>  </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CommentList;
