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
    let starShowed = [];

    if (filter === '') {
      starShowed = Object.values(stars);
    } else {
      const keywords = filter
        .split(' ')
        .filter(keyword => keyword !== '');

      const showedStarsMap = keywords.reduce((showedStars, keyword) => {
        Object
          .keys(showedStars)
          .forEach((starName) => {
            const star = showedStars[starName];

            const isFullNameMatch = star.full_name.toLowerCase()
              .includes(keyword);
            const isDescriptionMatch = (star.description || '').toLowerCase()
              .includes(keyword);
            const isLinkMatch = (star.link || '').toLowerCase()
              .includes(keyword);
            const isLanguageMatch = (star.language || '').toLowerCase()
              .includes(keyword);

            if (!(isFullNameMatch || isDescriptionMatch || isLanguageMatch || isLinkMatch)) {
              // eslint-disable-next-line no-param-reassign
              delete showedStars[starName];
            }
          });
        return showedStars;
      }, Object.assign({}, stars));
      starShowed = Object.values(showedStarsMap);
    }

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
