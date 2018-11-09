import React from 'react';
import ArticleContainer from './Article';

class ArticleList extends React.PureComponent {
  render() {
    return (
      <div>
        {Object.values(this.props.articles).map(article => (
          <ArticleContainer key={article.id} article={article} />
        ))}
      </div>
    );
  }
}

export default ArticleList;
