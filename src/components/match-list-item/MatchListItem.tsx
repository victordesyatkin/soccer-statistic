import React, { FC, useCallback } from 'react';
import styled from 'styled-components';

import { colors } from '../../assets/theme';
import { MatchProps } from '../../modules/types';
import MatchDate from '../match-date';
import MatchDay from '../match-day';
import MatchFixture from '../match-fixture';

const MatchListItemTableRow = styled.tr`
  font-size: 0.9rem;
  color: ${colors.black};
  &:nth-child(even) {
    background-color: ${colors.lightgrey};
  }
`;

const MatchListItemScore = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
`;

const MatchListItemTableCell = styled.td`
  padding: 0.3rem 0.5rem;
`;

const MatchListItem: FC<{
  item: MatchProps;
  properties: string[];
}> = ({ item, properties }) => {
  console.log('matchListItem : ', item);
  const renderProperty = useCallback(
    (property) => {
      const { id } = item;
      let content = null;
      switch (property) {
        case 'date': {
          content = <MatchDate {...item} />;
          break;
        }
        case 'matchday': {
          content = <MatchDay {...item} />;
          break;
        }
        case 'fixture': {
          content = <MatchFixture {...item} />;
          break;
        }
        case 'score': {
          const {
            score: {
              fullTime: { homeTeam, awayTeam },
            },
          } = item;
          content = (
            <MatchListItemScore>
              {`${homeTeam || '-'}:${awayTeam || '-'}`}
            </MatchListItemScore>
          );
          break;
        }
        default: {
          content = property;
        }
      }
      return (
        <MatchListItemTableCell key={`${id}-property-${property}`}>
          {content}
        </MatchListItemTableCell>
      );
    },
    [item]
  );
  return (
    <MatchListItemTableRow>
      {properties.map(renderProperty)}
    </MatchListItemTableRow>
  );
};

export default MatchListItem;
