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
      this.state = {
        query: '',
        error: null,
        entries: [],
      };
    }

    componentDidMount() {
      fetch()
        .then(mapTransactions)
        .then((entries) => {
          if (!this.isCancelled) this.setState({ entries });
        });
    }

    componentWillUnmount = () => {
      this.isCancelled = true;
    }

    getEntries = () => (
      this.state.filteredEntries
        ? this.state.filteredEntries.map(({ index, type }) =>
          ({ ...this.state.entries[index], type }))
        : this.state.entries
    )

    handleSuccess = (entries) => {
      this.setState({
        error: null,
        filteredEntries: entries,
      });
    }

    handleError = () => {
      this.setState({ error: 'Please only use numeric and ($ / - .) characters.' });
    }

    handleQuery = (query) => {
      this.setState({ query, error: null, filteredEntries: null });

      if (query.length > 0) {
        fuzzySearch(query)(this.state.entries)
          .then(this.handleSuccess)
          .catch(this.handleError);
      }
    }

    render() {
      const { entries, ...rest } = this.state;

      return (
        <Component
          entries={this.getEntries()}
          onQuery={this.handleQuery}
          {...this.props}
          {...rest}
        />
      );
    }
  }
);

export default withSubscription;
