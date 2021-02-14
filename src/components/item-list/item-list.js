/* eslint-disable class-methods-use-this */
import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import bind from "bind-decorator";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import SearchPanel from "../search-panel";
import "./item-list.scss";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      error: false,
      loading: true,
      term: "",
      year: "",
    };
  }

  componentDidMount() {
    const { getItems } = this.props;
    if (getItems) {
      getItems()
        .then((items) => {
          this.setState({ items, loading: false, error: false });
        })
        .catch(this.handleError);
    } else {
      this.setState({ items: [], loading: false, error: false });
    }
  }

  @bind
  handleSearchChange(term) {
    this.setState({ term });
  }

  @bind
  handleCalendarChange(value) {
    const year = value.getFullYear();
    this.setState({ year });
  }

  handleError() {
    this.setState({
      loading: false,
      error: true,
    });
  }

  search(items, term, year) {
    let results = [...items];
    if (term.length !== 0) {
      results = results.filter((item) => {
        return item.name.indexOf(term) > -1;
      });
    }
    if (year) {
      results = results.filter((item) => {
        const { currentSeason } = item;
        const { startDate, endDate } = currentSeason || {};
        if (startDate && endDate) {
          return (
            new Date(endDate).getFullYear() >= year &&
            year >= new Date(startDate).getFullYear()
          );
        }
        return item;
      });
    }
    return results;
  }

  @bind
  renderItem(item) {
    const { renderItem } = this.props;
    let content = "";
    if (renderItem) {
      content = renderItem(item);
    }
    return <ListGroup.Item key={item.id}>{content}</ListGroup.Item>;
  }

  renderItems(items) {
    return items.map(this.renderItem);
  }

  render() {
    const { items, loading, error, term, year } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? (
      <>
        <ListGroup>
          {this.renderItems(this.search(items, term, year))}
        </ListGroup>
      </>
    ) : null;
    if (!items) {
      return <Spinner animation="border" role="status" />;
    }
    return (
      <div className="item-list">
        <div className="item-list__search-panel">
          <SearchPanel handleSearchChange={this.handleSearchChange} />
        </div>
        <div className="item-list__calendar">
          <Calendar
            onChange={this.handleCalendarChange}
            onClickYear={this.handleCalendarChange}
            onClickMonth={this.handleCalendarChange}
          />
        </div>
        <div className="item-list__content">
          {errorMessage}
          {spinner}
          {content}
        </div>
      </div>
    );
  }
}

ItemList.propTypes = {
  renderItem: PropTypes.func,
  getItems: PropTypes.func,
};

ItemList.defaultProps = {
  renderItem: null,
  getItems: null,
};

export default ItemList;
