class StateApi {
  constructor(rawData) {
    this.rawData = rawData;
    this.data = {
      articles: this.mapIntoObject(this.rawData.articles),
      authors: this.mapIntoObject(this.rawData.authors)
    };
  }
  mapIntoObject(arr) {
    return arr.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }
  lookupAuthor = authorId => {
    return this.data.authors[authorId];
  };
  getState = () => {
    return this.data;
  };
}
export default StateApi;
