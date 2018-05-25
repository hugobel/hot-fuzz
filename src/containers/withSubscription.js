import React from 'react';
import flow from 'lodash/flow';
import fetch from '../services/fetch';
import fuzzySearch from '../services/fuzzySearch';
import { escapeStr } from '../utils/regex';
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

    extendsCurrentQuery = query => (
      !!this.state.query && !!query.match(`^(${escapeStr(this.state.query)})`)
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
      const entries = this.extendsCurrentQuery(query)
        ? this.state.filteredEntries
        : this.state.entries;

      this.setState({ query, error: null, filteredEntries: null });

      if (query.length > 0) {
        fuzzySearch(query)(entries)
          .then(this.handleSuccess)
          .catch(this.handleError);
      }
    }

    render() {
      const { entries, filteredEntries, ...rest } = this.state;

      return (
        <Component
          entries={filteredEntries || entries}
          onQuery={this.handleQuery}
          {...this.props}
          {...rest}
        />
      );
    }
  }
);

export default withSubscription;
