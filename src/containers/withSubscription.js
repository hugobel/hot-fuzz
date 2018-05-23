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
        ? this.state.filteredEntries.map(({ index, type }) =>
          ({ ...this.state.entries[index], type }))
        : this.state.entries
    );

    handleQuery = (query) => {
      this.setState({ query, filteredEntries: null });

      if (query.length > 0) {
        fuzzySearch(query)(this.state.entries)
          .then((entries) => {
            this.setState({ filteredEntries: entries });
          }).catch((e) => {
            console.error(e.message);
          });
      }
    }

    render() {
      return (
        <Component
          query={this.state.query}
          entries={this.getEntries()}
          onQuery={this.handleQuery}
          {...this.props}
        />
      );
    }
  }
);

export default withSubscription;
