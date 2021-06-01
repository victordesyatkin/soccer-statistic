import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { colors, sizes } from '../../assets/theme';

import { ItemsTeamProps, MatchProps, ReducerProps } from '../../modules/types';
import { getRoutes } from '../../helpers';
import Link from '../link';

const MatchFixtureWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const MatchFixtureItem = styled.span`
  display: flex;
  align-items: center;
  min-width: 0;
`;

const MatchFixtureTeamFlag = styled.span<{ src: string }>`
  width: 1.429rem;
  height: 1.071rem;
  margin-right: 0.5rem;
  display: none;
  border-radius: 4px;

  @media (min-width: ${sizes.xs}) {
    display: ${({ src }) => (src ? 'initial' : '')};
  }
`;

const MatchFixtureTeamImage = styled.img`
  width: 100%;
  height: 100%;
  &[src=''] {
    visibility: hidden;
  }
`;

const MatchFixtureLink = styled(Link)`
  color: ${colors.black};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
`;

const MatchFixtureSeparator = styled.span`
  padding: 0 0.5rem;
`;

const MatchFixture: FC<MatchProps> = (props) => {
  const { awayTeam, homeTeam } = props;
  const { name: awayTeamName, id: awayTeamId } = awayTeam;
  const { name: homeTeamName, id: homeTeamId } = homeTeam;
  const routes = useMemo(() => getRoutes(), []);
  const teams = useSelector(
    (state: ReducerProps): ItemsTeamProps => state.teams.items
  );
  const awayTeamFilled = teams[awayTeamId] || {};
  const homeTeamFilled = teams[homeTeamId] || {};
  const { logo: awayTeamLogo } = awayTeamFilled;
  const { logo: homeTeamLogo } = homeTeamFilled;
  return (
    <MatchFixtureWrapper>
      <MatchFixtureItem>
        {homeTeamLogo && (
          <MatchFixtureTeamFlag src={homeTeamLogo}>
            <MatchFixtureTeamImage src={homeTeamLogo} alt={homeTeamName} />
          </MatchFixtureTeamFlag>
        )}

        <MatchFixtureLink
          to={`${routes.TEAMS}/${homeTeamId}`}
          title={homeTeamName}
        >
          {homeTeamName}
        </MatchFixtureLink>
      </MatchFixtureItem>
      <MatchFixtureSeparator>-</MatchFixtureSeparator>
      <MatchFixtureItem>
        {awayTeamLogo && (
          <MatchFixtureTeamFlag src={awayTeamLogo}>
            <MatchFixtureTeamImage src={awayTeamLogo} alt={awayTeamName} />
          </MatchFixtureTeamFlag>
        )}
        <MatchFixtureLink
          to={`${routes.TEAMS}/${awayTeamId}`}
          title={awayTeamName}
        >
          {awayTeamName}
        </MatchFixtureLink>
      </MatchFixtureItem>
    </MatchFixtureWrapper>
  );
};

export default MatchFixture;
