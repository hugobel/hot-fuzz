import React from 'react';
import flow from 'lodash/flow';
import fetch from '../services/fetch';
import fuzzySearch from '../services/fuzzySearch';
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
          if (!this.isCancelled) this.setState({ entries });
        });
    }

    componentWillUnmount() {
      this.isCancelled = true;
    }

    handleQuery(query) {
      this.setState({ query, filteredEntries: null });

      if (query.length > 0) {
        fuzzySearch(query)(this.state.entries)
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
