import React from 'react';
import './style.scss';
import RepoItem from '../RepoItem';

export default class RepoList extends React.Component {
  render() {
    if (Object.keys(this.props.stars).length === 0 && this.props.stars.constructor === Object) {
      return (
        <div className="blank">
          Please input your github username and wait for half hour or restart chrome compeletly.
        </div>
      );
    }

    const { stars, filter } = this.props;
    const starShowed = [];
    Object.keys(stars).map((item) => {
      if (filter === '') {
        starShowed.push(stars[item]);
      } else {
        const star = stars[item];
        if (
          star.full_name.toLowerCase().includes(filter.toLowerCase())
          ||
          star.description.toLowerCase().includes(filter.toLowerCase())
        ) {
          starShowed.push(star);
        }
      }
      return 0;
    });
    const RepoItemList = starShowed.map((item) => {
      const { id, description } = item;
      return (
        <RepoItem
          key={id}
          name={item.full_name}
          description={description}
          link={item.html_url}
        />
      );
    });
    return (
      <ul>
        {RepoItemList}
      </ul>
    );
  }
}
