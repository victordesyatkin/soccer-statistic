import React, { FC } from 'react';

import { MatchesPageProps } from '../../modules/types';
import MatchList from '../match-list';

const MatchesPage: FC<MatchesPageProps> = ({ items }) => {
  return (
    <div>
      <div>Panel</div>
      <MatchList items={items} />
    </div>
  );
};

export default MatchesPage;
