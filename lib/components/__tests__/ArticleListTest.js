import React from 'react';
import ArticleList from '../ArticleList';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Article from '../Article';
Enzyme.configure({ adapter: new Adapter() });

describe('ArticleList', () => {
  const testProps = {
    articles: {
      a: { id: 'a' },
      b: { id: 'b' }
    }
  };

  Article.propTypes = {};
  test('renders correctly', () => {
    const wrapper = Enzyme.shallow(<ArticleList {...testProps} />);

    expect(wrapper.find('Article').length).toBe(2);
    expect(wrapper).toMatchSnapshot();
  });
});
