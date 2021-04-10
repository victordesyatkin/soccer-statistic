import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LeagueList from '../../components/league-list';
import { fetchLeagues } from '../../modules/actions';
import { initialStateProps } from '../../modules/types';
import {
  withStatisticService,
  WithStatisticServiceProps,
} from '../../components/hoc-helpers';

const LeagueListContainer: FC<WithStatisticServiceProps> = ({
  serviceStatistic,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLeagues({ serviceStatistic })());
  }, []);
  const items = useSelector((state: Partial<initialStateProps>) => {
    return state?.leagues?.items;
  });
  return <LeagueList items={items} />;
};

export default withStatisticService()(LeagueListContainer);
