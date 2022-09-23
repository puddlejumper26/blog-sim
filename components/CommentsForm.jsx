import React, { useState, useRef, useEffect } from "react";
import { submitComment } from "../services";
/**
 *  This component is to send user comments to the server
 */
const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    comment: null,
    storeData: false,
  });
  // const commentEl = useRef("sample");
  // const nameEl = useRef("sample");
  // const emailEl = useRef("sample");
  // const storeDataEl = useRef("sample");

  //  if we visit the post the second time, the localStorage data is already there,
  useEffect(() => {
    // try {
    //   nameEl.current.value = window.localStorage.getItem("name");
    //   emailEl.current.value = window.localStorage.getItem("email");
    // } catch (error) {
    //   console.log(error);
    // }
    setLocalStorage(window.localStorage);

    console.log("useEffect --localStorage-", localStorage);
    const initalFormData = {
      name: window.localStorage.getItem("name"),
      email: window.localStorage.getItem("email"),
      comment: window.localStorage.getItem("comment"),
      storeData:
        window.localStorage.getItem("name") ||
        window.localStorage.getItem("email"),
    };
    console.log("initalFormData ----", initalFormData);
    setFormData(initalFormData);

    let commentEl = document.getElementById("comment");
    let nameEl = document.getElementById("name");
    let emailEl = document.getElementById("email");
    console.log("useEffect-comment--", commentEl);
    commentEl.innerHTML = initalFormData.comment;
    nameEl.innerHTML = initalFormData.name;
    emailEl.innerHTML = initalFormData.email;
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    console.log("onInputChange -- target --", target);
    if (target.type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handlePostSubmission = () => {
    console.log("button is clicked");
    setError(false);

    // const { value: comment } = commentEl.current;
    // const { value: email } = emailEl.current;
    // const { value: name } = nameEl.current;
    // const { checked: storeData } = storeDataEl.current;
    const { name, email, comment, storeData } = formData;
    console.log(11111, comment, name, email, storeData);
    // if (
    //   !commentEl.current.value ||
    //   !nameEl.current.value ||
    //   !emailEl.current.value
    // ) {
    //   console.log("----not fullfilled----");
    //   setError(true);
    //   return;
    // }
    if (!name || !email || !comment) {
      setError(true);
      return;
    }
    const commentObj = { name, email, comment, slug };

    if (!!storeData) {
      console.log(2222);
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      console.log(333);
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    // the res in the follow is from the backend
    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      // show the message only for 3 seconds, then close it
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
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
          id="comment"
          name="comment"
          placeholder="Comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-green-200 bg-green-100 text-green-700"
          id="name"
          placeholder="Name"
          name="name"
        />
        <input
          type="email"
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-green-200 bg-green-100 text-green-700"
          id="email"
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
          Submit Comment
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

// const CommentsForm = ({ slug }) => {
//   const [error, setError] = useState(false);
//   const [localStorage, setLocalStorage] = useState(null);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [formData, setFormData] = useState({
//     name: null,
//     email: null,
//     comment: "",
//     storeData: false,
//   });

//   useEffect(() => {
//     console.log("localStorage --", localStorage);
//     setLocalStorage(window.localStorage);
//     const initalFormData = {
//       name: window.localStorage.getItem("name"),
//       email: window.localStorage.getItem("email"),
//       storeData:
//         window.localStorage.getItem("name") ||
//         window.localStorage.getItem("email"),
//     };
//     setFormData(initalFormData);
//   }, []);

//   const onInputChange = (e) => {
//     const { target } = e;
//     if (target.type === "checkbox") {
//       setFormData((prevState) => ({
//         ...prevState,
//         [target.name]: target.checked,
//       }));
//     } else {
//       setFormData((prevState) => ({
//         ...prevState,
//         [target.name]: target.value,
//       }));
//     }
//   };

//   const handlePostSubmission = () => {
//     setError(false);
//     const { name, email, comment, storeData } = formData;
//     if (!name || !email || !comment) {
//       setError(true);
//       return;
//     }
//     const commentObj = {
//       name,
//       email,
//       comment,
//       slug,
//     };

//     if (storeData) {
//       window.localStorage.setItem("name", name);
//       window.localStorage.setItem("email", email);
//     } else {
//       window.localStorage.removeItem("name");
//       window.localStorage.removeItem("email");
//     }

//     submitComment(commentObj).then((res) => {
//       if (res.createComment) {
//         if (!storeData) {
//           formData.name = "";
//           formData.email = "";
//         }
//         formData.comment = "";
//         setFormData((prevState) => ({
//           ...prevState,
//           ...formData,
//         }));
//         setShowSuccessMessage(true);
//         setTimeout(() => {
//           setShowSuccessMessage(false);
//         }, 3000);
//       }
//     });
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
//       <h3 className="text-xl mb-8 font-semibold border-b pb-4">
//         Leave a Reply
//       </h3>
//       <div className="grid grid-cols-1 gap-4 mb-4">
//         <textarea
//           value={formData.comment}
//           onChange={onInputChange}
//           className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
//           name="comment"
//           placeholder="Comment"
//         />
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
//         <input
//           type="text"
//           value={formData.name}
//           onChange={onInputChange}
//           className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
//           placeholder="Name"
//           name="name"
//         />
//         <input
//           type="email"
//           value={formData.email}
//           onChange={onInputChange}
//           className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
//           placeholder="Email"
//           name="email"
//         />
//       </div>
//       <div className="grid grid-cols-1 gap-4 mb-4">
//         <div>
//           <input
//             checked={formData.storeData}
//             onChange={onInputChange}
//             type="checkbox"
//             id="storeData"
//             name="storeData"
//             value="true"
//           />
//           <label className="text-gray-500 cursor-pointer" htmlFor="storeData">
//             {" "}
//             Save my name, email in this browser for the next time I comment.
//           </label>
//         </div>
//       </div>
//       {error && (
//         <p className="text-xs text-red-500">All fields are mandatory</p>
//       )}
//       <div className="mt-8">
//         <button
//           type="button"
//           onClick={handlePostSubmission}
//           className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
//         >
//           Post Comment
//         </button>
//         {showSuccessMessage && (
//           <span className="text-xl float-right font-semibold mt-3 text-green-500">
//             Comment submitted for review
//           </span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommentsForm;
