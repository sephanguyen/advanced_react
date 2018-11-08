class StateApi {
  constructor(rawData) {
    this.rawData = rawData;
    this.data = {
      articles: this.mapIntoObject(this.rawData.articles),
      authors: this.mapIntoObject(this.rawData.authors),
      searchTerm: ''
    };
    this.subscriptions = {};
    this.lastSubscriptionId = 0;
  }
  mapIntoObject(arr) {
    return arr.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }

  subscribe = cb => {
    this.lastSubscriptionId++;
    this.subscriptions[this.lastSubscriptionId] = cb;
    return this.lastSubscriptionId;
  };

  unsubsribe = subscriptionId => {
    delete this.subscriptions[subscriptionId];
  };

  notifySubscriber = () => {
    Object.values(this.subscriptions).forEach(cb => cb());
  };

  lookupAuthor = authorId => {
    return this.data.authors[authorId];
  };
  getState = () => {
    return this.data;
  };

  mergeWithState = stateChange => {
    this.data = { ...this.data, ...stateChange };
    this.notifySubscriber();
  };
  setSearchTerm = searchTerm => {
    this.mergeWithState({
      searchTerm
    });
  };
}
export default StateApi;
