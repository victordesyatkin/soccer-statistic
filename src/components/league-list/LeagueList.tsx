import React from 'react';

import { LeaguesProps, LeagueProps } from '../../modules/types';

import LeagueListItem from '../league-list-item';
import './league-list.scss';

const LeagueList: React.FC<LeaguesProps> = ({ items }) => {
  const className = 'league-list';
  const renderItem = (props: LeagueProps) => {
    const { id } = props;
    return (
      <li className={`${className}__item`} key={id}>
        <LeagueListItem {...props} />
      </li>
    );
  };
  return <ul className={className}>{items?.map(renderItem)}</ul>;
};

export default LeagueList;
