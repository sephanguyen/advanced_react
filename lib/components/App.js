import React from 'react';
import PropTypes from 'prop-types';
import Perf from 'react-addons-perf';
import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import pickBy from 'lodash.pickby';
import Timestamp from './Timestamp';

if (typeof window !== 'undefined') {
  window.Perf = Perf;
}

class App extends React.PureComponent {
  static childContextTypes = {
    store: PropTypes.object
  };

  getChildContext() {
    return {
      store: this.props.store
    };
  }

  appState = () => {
    const { articles, searchTerm } = this.props.store.getState();
    return { articles, searchTerm };
  };
  state = this.appState();

  onStoreChange = () => {
    this.setState(this.appState());
  };

  // shouldComponentUpdate(nextProps, nextStates) {
  //   return (
  //     nextStates.articles !== this.state.articles ||
  //     nextStates.searchTerm !== this.state.searchTerm
  //   );
  // }

  componentDidMount() {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();

    setImmediate(() => {
      Perf.start();
    });
    setTimeout(() => {
      Perf.stop();
      Perf.printWasted();
    }, 5000);
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
    // this.props.store.stopClock();
  }

  render() {
    let { articles, searchTerm } = this.state;
    const searchRE = new RegExp(searchTerm, 'i');
    if (searchTerm) {
      articles = pickBy(articles, value => {
        return value.title.match(searchRE) || value.body.match(searchRE);
      });
    }

    return (
      <div>
        <Timestamp />
        <SearchBar />
        <ArticleList articles={articles} />
      </div>
    );
  }
}

export default App;
