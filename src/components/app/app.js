/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable class-methods-use-this */
import React, { Component } from "react";
import bind from "bind-decorator";

import StatisticService from "../../services";
import Header from "../header";
import ErrorIndicator from "../error-indicator";
import ItemList from "../item-list";
import League from "../league";
import "./app.scss";

class App extends Component {
  statisticService = new StatisticService();

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  @bind
  renderItem(item) {
    return <League {...item} />;
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <ErrorIndicator />;
    }
    return (
      <div>
        <Header />
        <ItemList
          getItems={this.statisticService.getAllCompetitions}
          renderItem={this.renderItem}
        />
      </div>
    );
  }
}

export default App;
