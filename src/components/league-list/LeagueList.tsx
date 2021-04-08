import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useActions } from '../../helpers';
import {
  leaguesLoaded as actionLeaguesLoaded,
  leaguesRequested as actionLeaguesRequested,
} from '../../actions';
import { LeaguesProps, LeagueProps } from '../../services';
import {
  withStatisticService,
  WithStatisticServiceProps,
} from '../hoc-helpers';
import LeagueListItem from '../league-list-item';
import './league-list.scss';

const LeagueList: React.FC<WithStatisticServiceProps> = ({
  serviceStatistic,
}) => {
  const { leaguesLoaded, leaguesRequested } = useActions({
    leaguesLoaded: actionLeaguesLoaded,
    leaguesRequested: actionLeaguesRequested,
  });
  useEffect(() => {
    leaguesRequested();
    serviceStatistic?.getLeagues().then(leaguesLoaded);
  }, []);
  const leagues = useSelector((state: Partial<LeaguesProps>) => {
    console.log(state);
    return state?.leagues;
  });
  console.log('leagues : ', leagues);

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

export default withStatisticService()(LeagueList);
