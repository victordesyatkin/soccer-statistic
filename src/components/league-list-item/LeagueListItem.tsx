import React from 'react';

import './league-list-item.scss';
import { LeagueProps } from '../../services';

const LeagueListItem: React.FC<Partial<LeagueProps>> = (props) => {
  const { logoPath, name, countryId } = props;
  const className = 'league-list-item';
  return (
    <article className={className}>
      <div className={`${className}__logo`}>
        <img src={logoPath} alt={name} title={name} />
      </div>
      <p className={`${className}__name`}>{name}</p>
      <div className={`${className}__country`}>{countryId}</div>
    </article>
  );
};

export default LeagueListItem;
