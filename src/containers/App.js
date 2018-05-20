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
        <p className="table-details">Showing results for: {this.state.query}</p>
        <TransactionsTable entries={this.props.data} />
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withSubscription(App);
