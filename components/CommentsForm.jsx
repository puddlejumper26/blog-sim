import React, { useState, useRef, useEffect } from "react";

/**
 *  This component is to send user comments to the server
 */
const CommentsForm = () => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: null,
  //   email: null,
  //   comment: null,
  //   storeData: false,
  // });
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  const onInputChange = () => {};

  const handlePostSubmission = () => {
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: email } = emailEl.current;
    const { value: name } = nameEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug };

    if (storeData) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          onChange={onInputChange}
          className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-green-200 bg-green-100 text-green-700"
          name="comment"
          placeholder="Comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-green-200 bg-green-100 text-green-700"
          placeholder="Name"
          name="name"
        />
        <input
          type="email"
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-green-200 bg-green-100 text-green-700"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            onChange={onInputChange}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="text-green-500 cursor-pointer ml-2"
            htmlFor="storeData"
          >
            {" "}
            Save my name, email in this browser for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are mandatory</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handlePostSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
};
export default CommentsForm;
