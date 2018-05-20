import React from 'react';
import data from '../services/fetch';
import { mapTransactions } from '../utils/collection';

const withSubscription = Component => (
  class extends React.Component {
    constructor() {
      super();
      this.state = { data: [] };
    }

    componentDidMount() {
      const transactions = mapTransactions(data);
      setTimeout(() => { this.setState({ data: transactions }); });
    }

    render() {
      return <Component data={this.state.data} {...this.props} />;
    }
  }
);

export default withSubscription;
