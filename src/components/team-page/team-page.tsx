import React, { FC } from 'react';
import styled from 'styled-components';

import { Scrollbars, sizes } from '../../assets/theme';
import { TeamProps } from '../../modules/types';
import TeamInfo from '../team-info';
import PlayerList from '../player-list';

const TeamPageWrapper = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const TeamInfoWrapper = styled.div`
  background-color: white;
  display: inline-flex;

  @media (min-width: ${sizes.md}) {
    margin-right: 2rem;
  }
`;

const PlayerListWrapper = styled(Scrollbars)`
  background-color: white;
  overflow: auto;
  display: inline-flex;
`;

const TeamPage: FC<{ team: TeamProps }> = ({ team }) => {
  const { squad } = team;
  return (
    <TeamPageWrapper>
      <TeamInfoWrapper>
        <TeamInfo {...team} />
      </TeamInfoWrapper>
      <PlayerListWrapper>
        <PlayerList items={squad} />
      </PlayerListWrapper>
    </TeamPageWrapper>
  );
};

export default TeamPage;
