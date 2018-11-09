import React from 'react';
import debounce from 'lodash.debounce';

class SearchBar extends React.Component {
  state = {
    searchTerm: ''
  };

  doSerch = debounce(() => {
    this.props.doSerch(this.state.searchTerm);
  }, 3000);

  handlSearch = event => {
    this.setState({ searchTerm: event.target.value }, () => {
      this.doSerch();
    });
  };

  render() {
    return (
      <input
        type="search"
        value={this.state.searchTerm}
        placeholder="Enter search team"
        onChange={this.handlSearch}
      />
    );
  }
}

export default SearchBar;
