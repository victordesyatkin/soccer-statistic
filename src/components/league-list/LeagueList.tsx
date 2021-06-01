import React, { useMemo, FC } from 'react';

import { LeaguesProps, LeagueProps } from '../../modules/types';

import Link from '../link';
import LeagueListItem from '../league-list-item';
import './league-list.scss';
import { getRoutes } from '../../helpers';
import Nodata from '../no-data';

const LeagueList: FC<LeaguesProps> = ({ items }) => {
  const routes = useMemo(() => getRoutes(), []);
  const className = 'league-list';
  const renderItem = (props: LeagueProps) => {
    const { id } = props;
    return (
      <li className={`${className}__item`} key={id}>
        <Link to={`${routes.TEAMS}?leagueId=${id}`}>
          <LeagueListItem {...props} />
        </Link>
      </li>
    );
  };
  const itemsLength = useMemo(() => items?.length, [items]);
  return (
    <ul className={className}>
      {itemsLength ? items?.map(renderItem) : <Nodata />}
    </ul>
  );
};

export default LeagueList;
