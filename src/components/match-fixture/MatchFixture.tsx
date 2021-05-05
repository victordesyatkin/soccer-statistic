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
  width: 11.071rem;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MatchFixtureTeamFlag = styled.span`
  width: 1.429rem;
  height: 1.071rem;
  margin-right: 0.5rem;
  display: none;

  @media (min-width: ${sizes.xs}) {
    display: initial;
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
  const homeTeamFilled = teams[awayTeamId] || {};
  const { area: awayTeamArea } = awayTeamFilled;
  const { area: homeTeamArea } = homeTeamFilled;
  const { ensignUrl: awayTeamEnsignUrl = '' } = awayTeamArea || {};
  const { ensignUrl: homeTeamEnsignUrl = '' } = homeTeamArea || {};
  return (
    <MatchFixtureWrapper>
      <MatchFixtureItem>
        <MatchFixtureTeamFlag>
          <MatchFixtureTeamImage src={awayTeamEnsignUrl} alt={awayTeamName} />
        </MatchFixtureTeamFlag>
        <MatchFixtureLink to={`${routes.TEAMS}/${awayTeamId}`}>
          {awayTeamName}
        </MatchFixtureLink>
      </MatchFixtureItem>
      <MatchFixtureSeparator>vs</MatchFixtureSeparator>
      <MatchFixtureItem>
        <MatchFixtureTeamFlag>
          <MatchFixtureTeamImage src={homeTeamEnsignUrl} alt={homeTeamName} />
        </MatchFixtureTeamFlag>
        <MatchFixtureLink to={`${routes.TEAMS}/${homeTeamId}`}>
          {homeTeamName}
        </MatchFixtureLink>
      </MatchFixtureItem>
    </MatchFixtureWrapper>
  );
};

export default MatchFixture;
