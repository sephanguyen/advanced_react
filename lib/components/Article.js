import React from 'react';
import PropTypes from 'prop-types';

const style = {
  article: {
    paddingBottom: 10,
    borderBottomStyle: 'solid',
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    marginBottom: 10
  },
  title: {
    fontWeight: 'bold'
  },
  date: {
    fontSize: '0.8em',
    color: '#888'
  },
  author: {
    paddingTop: 10,
    paddingBottom: 10
  },
  body: {
    paddingLeft: 20
  }
};
//function need props or dependen should add into class because re-render component will re-render function and object
const dateDisplay = dateString => new Date(dateString).toDateString();

const Article = (props, context) => {
  const { article } = props;
  const author = context.store.lookupAuthor(article.authorId);
  return (
    <div style={style.article}>
      <div style={style.title}>{article.title}</div>
      <div style={style.date}>{dateDisplay(article.date)}</div>
      <div style={style.author}>
        <a href={author.website}>
          {author.firstName} {author.lastName}
        </a>
      </div>
      <div style={style.body}>{article.body}</div>
    </div>
  );
};

Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  })
};

Article.contextTypes = {
  store: PropTypes.object
};

export default Article;
