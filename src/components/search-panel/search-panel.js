import React, { Component } from "react";
import PropTypes from "prop-types";
import bind from "bind-decorator";

import "./search-panel.scss";

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
    };
  }

  @bind
  handleSearchInputChange(event) {
    const term = event.target.value;
    this.setState({ term });
    const { handleSearchChange } = this.props;
    handleSearchChange(term);
  }

  render() {
    const { term } = this.state;
    return (
      <div className="search-panel">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search"
          value={term}
          onChange={this.handleSearchInputChange}
        />
      </div>
    );
  }
}

SearchPanel.propTypes = {
  handleSearchChange: PropTypes.func,
};

SearchPanel.defaultProps = {
  handleSearchChange: Function.prototype,
};

export default SearchPanel;
