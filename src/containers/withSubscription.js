import React from 'react';
import flow from 'lodash/flow';
import data from '../services/fetch';
import { mapProperties, sortByDate } from '../utils/collection';

const mapTransactions = flow([
  mapProperties,
  sortByDate,
]);

const withSubscription = Component => (
  class extends React.Component {
    constructor() {
      super();
      this.state = { query: '', entries: [] };
      this.handleQuery = this.handleQuery.bind(this);
    }

    componentDidMount() {
      const transactions = mapTransactions(data);
      setTimeout(() => {
        this.setState({ entries: transactions });
      });
    }

    handleQuery(query) {
      this.setState({ query });
    }

    render() {
      return (
        <Component
          query={this.state.query}
          entries={this.state.entries}
          handleQuery={this.handleQuery}
          {...this.props}
        />
      );
    }
  }
);

export default withSubscription;
