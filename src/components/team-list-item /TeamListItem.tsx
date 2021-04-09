import React from 'react';

import './team-list-item.scss';
import { TeamProps } from '../../modules/types';

const LeagueListItem: React.FC<Partial<TeamProps>> = (props) => {
  const { logoPath, name, countryId } = props;
  const className = 'team-list-item';
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
