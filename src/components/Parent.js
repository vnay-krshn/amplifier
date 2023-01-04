import React, { useState } from "react";
import Child from "./Child";

const Parent = (props) => {
  return (
    <div
      style={{
        height: "20vh",
        width: "20vw",
        display: "flex",
        flexDirection: "column",
        marginTop: "1em",
        border:"2px solid grey",
        justifyContent:"space-around"
      }}
    >
      <button onClick={() => props?.hideParent()}>Close parent</button>
      <span>I am the parent popup!</span>
      <button onClick={() => props?.onShowChildPopup()}>
        Show me the child!
      </button>
    </div>
  );
};

export default Parent;
