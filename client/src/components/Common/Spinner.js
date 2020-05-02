import React from "react";
import spinner from "./spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: "100px", margin: "auto", display: "block", color: "red" }}
        alt="Loading..."
      />
    </div>
  );
};
