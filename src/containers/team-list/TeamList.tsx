import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TeamList from '../../components/team-list';
import { fetchLeagues } from '../../modules/actions';
import { initialStateProps } from '../../modules/types';
import {
  withStatisticService,
  WithStatisticServiceProps,
} from '../../components/hoc-helpers';

const TeamListContainer: FC<WithStatisticServiceProps> = ({
  serviceStatistic,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLeagues({ serviceStatistic }));
  }, []);
  const items = useSelector((state: Partial<initialStateProps>) => {
    return state?.teams?.items;
  });
  return <TeamList items={items} />;
};

export default withStatisticService()(TeamListContainer);
