import React, { FC } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { Scrollbars, sizes } from '../../assets/theme';
import { TeamProps } from '../../modules/types';
import { extractFormatMessage } from '../../helpers';
import TeamInfo from '../team-info';
import PlayerList from '../player-list';
import Breadcrumbs from '../breadcrumbs';
import Title from '../title';

const TeamPageWrapper = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 1rem 0;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
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
  const { squad, name } = team;
  const { formatMessage } = useIntl();
  const title = extractFormatMessage({ id: 'teams', formatMessage });
  const readyTitle = `${title} - ${name}`;
  return (
    <TeamPageWrapper>
      <Header>
        <Breadcrumbs />
      </Header>
      <Body>
        <TeamInfoWrapper>
          <TeamInfo {...team} />
        </TeamInfoWrapper>
        <PlayerListWrapper>
          <PlayerList items={squad} />
        </PlayerListWrapper>
      </Body>
      <Title title={readyTitle} />
    </TeamPageWrapper>
  );
};

export default TeamPage;
