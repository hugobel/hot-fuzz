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

    getEntries = () => (
      this.state.filteredEntries
        ? this.state.filteredEntries.map(({ index, matchType }) =>
          ({ ...this.state.entries[index], matchType }))
        : this.state.entries
    );

    handleQuery = (query) => {
      if (query.length < 1) {
        this.setState({ query, filteredEntries: null });
      } else {
        fuzzySearch(query)(this.state.entries)
          .then((entries) => {
            this.setState({ filteredEntries: entries });
          });
      }
    }

    render() {
      const entries = this.getEntries();

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
