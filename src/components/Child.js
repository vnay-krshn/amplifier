import React from "react";

const Child = (props) => {
  return (
    <div
      style={{
        height: "20vh",
        width: "20vw",
        display: "flex",
        flexDirection: "column",
        marginTop:"1em",
        border:"2px solid pink"
      }}
    >
      <button onClick={() => props?.onCloseChild()}>Close child</button>
      <span>I am the child popup!</span>
    </div>
  );
};

export default Child;
