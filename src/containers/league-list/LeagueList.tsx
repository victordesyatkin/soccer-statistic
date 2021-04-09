import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LeagueList from '../../components/league-list';
import { fetchLeagues } from '../../actions';
import { LeaguesProps } from '../../services';
import {
  withStatisticService,
  WithStatisticServiceProps,
} from '../../components/hoc-helpers';

const LeagueListContainer: FC<WithStatisticServiceProps> = ({
  serviceStatistic,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchLeagues({ serviceStatistic, dispatch });
  }, []);
  const leagues = useSelector((state: Partial<LeaguesProps>) => {
    return state?.leagues;
  });
  console.log('LeagueListContainer : ', leagues);
  return <LeagueList leagues={leagues} />;
};

export default withStatisticService()(LeagueListContainer);
