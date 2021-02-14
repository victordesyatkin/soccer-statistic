import React from "react";
import PropTypes from "prop-types";

import "./league.scss";

const League = ({ name, id }) => {
  return (
    <a className="league" href={`/leagues/${id}`}>
      {name}
    </a>
  );
};

League.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
};

League.defaultProps = {
  name: "",
  id: 0,
};

export default League;
