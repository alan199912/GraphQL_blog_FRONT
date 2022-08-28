import React, { useRef, useState, useEffect } from "react";
import { submitComment } from "../services";

const CommentsForm = ({ slug }: any) => {
  const [isError, setIsError] = useState(false);
  // const [localStorage, setLocalStorage] = useState(null);
  const [isShowSuccessMessage, setIsShowSuccessMessage] = useState(false);

  const commentsEl = useRef<HTMLTextAreaElement>(null);
  const nameEl = useRef<HTMLInputElement>(null);
  const emailEl = useRef<HTMLInputElement>(null);
  const storeEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  const handleCommentSubmission = () => {
    setIsError(false);

    if (
      !commentsEl?.current?.value ||
      !nameEl?.current?.value ||
      !emailEl?.current?.value
    ) {
      setIsError(true);
      return;
    }

    const commentObj = {
      comment: commentsEl.current.value,
      name: nameEl.current.value,
      email: emailEl.current.value,
      slug,
    };

    if (storeEl?.current?.checked) {
      window.localStorage.setItem("name", nameEl.current.value);
      window.localStorage.setItem("email", emailEl.current.value);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    submitComment(
      commentObj.slug,
      commentObj.comment,
      commentObj.email,
      commentObj.name
    )
      .then(() => {
        setIsShowSuccessMessage(true);

        setTimeout(() => {
          setIsShowSuccessMessage(false);
        }, 3000);
      })
      .catch(() => {
        setIsError(true);
      });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentsEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-78"
          placeholder="Write your comment here..."
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-78"
          placeholder="Write your name here..."
          name="name"
        />
        <input
          type="email"
          ref={emailEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-78"
          placeholder="Write your email here..."
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            htmlFor="storeData"
            className="text-gray-500 cursor-pointer ml-2"
          >
            Save my e-mail and name for the next time I comment.
          </label>
        </div>
      </div>
      {isError && (
        <p className="text-red-500 text-sm">All fields are required</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {isShowSuccessMessage && (
          <p className="text-xl float-right font-semibold text-green-500">
            Comment posted successfully
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
