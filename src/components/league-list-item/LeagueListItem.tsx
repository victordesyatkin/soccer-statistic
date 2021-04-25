import React from 'react';

import './league-list-item.scss';
import { LeagueProps } from '../../modules/types';

const LeagueListItem: React.FC<LeagueProps> = (props) => {
  const { logo, name, area } = props;
  const { name: countryName } = area;
  const className = 'league-list-item';
  return (
    <article className={className}>
      <div className={`${className}__logo`}>
        <img
          className={`${className}__image`}
          src={logo}
          alt={name}
          title={name}
        />
      </div>
      <p className={`${className}__name`}>{name}</p>
      <div className={`${className}__country`}>{countryName}</div>
    </article>
  );
};

export default LeagueListItem;
