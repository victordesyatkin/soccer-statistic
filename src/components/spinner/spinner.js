import React from "react";
import { Spinner as SpinnerBootstrap } from "react-bootstrap";

import "./spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner">
      <SpinnerBootstrap animation="border" role="status" />
    </div>
  );
};

export default Spinner;
