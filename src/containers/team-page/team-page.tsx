import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ReducerProps, WithStatisticServiceProps } from '../../modules/types';
import { withStatisticService } from '../../components/hoc-helpers';

const TeamsPageContainer: FC<WithStatisticServiceProps> = (
  serviceStatistic
) => {
  const { id } = useParams<{ id: string }>();
  const { teams: { items: teamItems = {} } = {} } = useSelector(
    (store: ReducerProps) => store
  );
  const team = useMemo(() => teamItems[id], [teamItems, id]);
  useEffect(() => {
    const { squad } = team || {};
    if (!team || squad) {
      // useDispatch();
    }
  }, [team]);
  // console.log('id : ', id);
  // console.log('team : ', team);
  return <div>TeamsPageContainer</div>;
};

export default withStatisticService()(TeamsPageContainer);
