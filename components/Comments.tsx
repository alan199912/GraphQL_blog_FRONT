import React, { useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { getComments } from "../services";

const Comments = ({ slug }: any) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((newComments) => setComments(newComments));
  }, [slug]);

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
        <h3 className="text-lg mb-8 font-semibold border-b pb-4">
          {`${comments.length} Comments`}
        </h3>
        {comments?.map((comment: any) => (
          <div key={comment.id} className="border-b border-gray-100 mb-4 pb-4">
            <p className="mb-4 flex align-center">
              <img
                src={comment.user.avatar.url}
                alt={comment.user.displayName}
                className="rounded-full mr-4"
                width="40px"
                height="40px"
              />
              <span className="font-semibold mr-auto">
                {comment.user.displayName}
              </span>
              {`on ${moment(+comment.createdAt).format("DD MMM, YYYY")}`}
            </p>
            <p className="whitespace-pre-line text-gray-600 w-full">
              {parse(comment.comment)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;
