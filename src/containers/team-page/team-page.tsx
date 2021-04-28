import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ReducerProps, WithStatisticServiceProps } from '../../modules/types';
import { fetchTeam } from '../../modules/actions';
import { withStatisticService } from '../../components/hoc-helpers';
import TeamPage from '../../components/team-page';
import Nodata from '../../components/no-data';

const TeamsPageContainer: FC<WithStatisticServiceProps> = (
  serviceStatistic
) => {
  const { id } = useParams<{ id: string }>();
  const { teams: { items: teamItems = {} } = {} } = useSelector(
    (store: ReducerProps) => store
  );
  const team = useMemo(() => teamItems[id], [teamItems, id]);
  const dispatch = useDispatch();
  useEffect(() => {
    const { squad } = team || {};
    if (!team || !squad) {
      dispatch(fetchTeam(serviceStatistic)({ teamId: id }));
    }
  }, [team, dispatch, serviceStatistic, id]);
  return team ? <TeamPage team={team} /> : <Nodata />;
};

export default withStatisticService()(TeamsPageContainer);
