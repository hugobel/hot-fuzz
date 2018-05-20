import React from 'react';
import PropTypes from 'prop-types';

import SearchBox from '../components/SearchBox';
import TransactionsTable from '../components/TransactionsTable';
import withSubscription from './withSubscription';

class App extends React.Component {
  constructor() {
    super();
    this.state = { query: '' };
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery(query) {
    this.setState({ query });
  }

  render() {
    return (
      <div className="app">
        <SearchBox onChange={this.handleQuery} />
        <TransactionsTable
          entries={this.props.data}
          query={this.state.query}
        />
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withSubscription(App);
