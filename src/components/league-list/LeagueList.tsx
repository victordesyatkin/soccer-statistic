import React from 'react';

import { LeaguesProps, LeagueProps } from '../../services';

import LeagueListItem from '../league-list-item';
import './league-list.scss';

const LeagueList: React.FC<LeaguesProps> = ({ leagues }) => {
  const className = 'league-list';
  const renderItem = (props: LeagueProps) => {
    const { id } = props;
    return (
      <li className={`${className}__item`} key={id}>
        <LeagueListItem {...props} />
      </li>
    );
  };
  return <ul className={className}>{leagues?.map(renderItem)}</ul>;
};

export default LeagueList;
