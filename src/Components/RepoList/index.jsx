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
          (star.description || '').toLowerCase().includes(filter.toLowerCase())
        ) {
          starShowed.push(star);
        }
      }
      return 0;
    });
    const RepoItemList = starShowed.map(item => (
      <RepoItem
        key={item.id}
        owner={item.owner.login}
        name={item.name}
        description={item.description}
        link={item.html_url}
        language={item.language}
        star={item.stargazers_count}
        license={item.license ? item.license.spdx_id || null : null}
      />
    ));
    return (
      <ul>
        {RepoItemList}
      </ul>
    );
  }
}
