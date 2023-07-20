import React, { useReducer } from "react";

export const UseReducer2 = () => {
  const initialValue = { firstname: "", lastname: "", age: "" };

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_FIELD":
        return { ...state, [action.field]: action.value };
      case "RESET_FORM":
        return initialValue;
      default:
        throw new Error("Unsupported action type");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", state);
    dispatch({ type: "RESET_FORM" });
  };

  const [state, dispatch] = useReducer(reducer, initialValue);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>User Form</p>
        <div>
          <input
            type="text"
            name="firstname"
            value={state.firstname}
            placeholder="Enter your firstname"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <input
            type="text"
            name="lastname"
            value={state.lastname}
            placeholder="Enter your lastname"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <input
            type="number"
            name="age"
            value={state.age}
            placeholder="Enter your age"
            onChange={handleChange}
          ></input>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// import React, { useReducer } from "react";

// // Initial state
// const initialState = {
//   name: "",
//   email: "",
// };

// // Reducer function
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "UPDATE_FIELD":
//       return { ...state, [action.field]: action.value };
//     case "RESET_FORM":
//       return initialState;
//     default:
//       throw new Error("Unsupported action type");
//   }
// };

// // Component
// export const UseReducer2 = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     dispatch({ type: "UPDATE_FIELD", field: name, value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform form submission logic here
//     console.log("Form submitted:", state);
//     dispatch({ type: "RESET_FORM" });
//   };

//   return (
//     <div>
//       <h1>Simple Form</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={state.name}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={state.email}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };
