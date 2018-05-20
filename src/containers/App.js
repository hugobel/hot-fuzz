import React from 'react';
import SearchBox from '../components/SearchBox';

class App extends React.Component {
  constructor() {
    super();

    this.state = {};
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery(query) {
    this.setState({ query });
  }

  render() {
    return (
      <div className="app">
        <SearchBox onChange={this.handleQuery} />
        <p>Showing results for: {this.state.query}</p>
      </div>
    );
  }
}

export default App;
