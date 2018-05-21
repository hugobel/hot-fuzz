import React from 'react';
import flow from 'lodash/flow';
import fetch from '../services/fetch';
import { processQuery } from '../services/fuzzySearch';
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
      fetch()
        .then(mapTransactions)
        .then((entries) => {
          this.setState({ entries });
        });
    }

    handleQuery(query) {
      this.setState({ query, filteredEntries: null });

      if (query.length > 0) {
        processQuery(query)(this.state.entries)
          .then((entries) => {
            this.setState({ filteredEntries: entries });
          });
      }
    }

    render() {
      const entries = this.state.filteredEntries || this.state.entries;

      return (
        <Component
          entries={entries}
          query={this.state.query}
          handleQuery={this.handleQuery}
          {...this.props}
        />
      );
    }
  }
);

export default withSubscription;
