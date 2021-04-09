import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TeamList from '../../components/team-list';
import { fetchLeagues } from '../../modules/actions';
import { LeaguesProps } from '../../services';
import {
  withStatisticService,
  WithStatisticServiceProps,
} from '../../components/hoc-helpers';

const TeamListContainer: FC<WithStatisticServiceProps> = ({
  serviceStatistic,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchLeagues({ serviceStatistic, dispatch });
  }, []);
  const teams = useSelector((state: Partial<LeaguesProps>) => {
    return state?.leagues;
  });
  return <TeamList teams={teams} />;
};

export default withStatisticService()(TeamListContainer);
