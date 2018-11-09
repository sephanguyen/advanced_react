class StateApi {
  constructor(rawData) {
    this.rawData = rawData;
    this.data = {
      articles: this.mapIntoObject(this.rawData.articles),
      authors: this.mapIntoObject(this.rawData.authors),
      searchTerm: '',
      timestamp: new Date()
    };
    this.subscriptions = {};
    this.lastSubscriptionId = 0;
    this.clock = null;
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

  unsubscribe = subscriptionId => {
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

  startClock = () => {
    this.clock = setInterval(() => {
      this.mergeWithState({ timestamp: new Date() });
    }, 1000);
  };

  stopClock = () => {
    clearInterval(this.clock);
  };
}
export default StateApi;
