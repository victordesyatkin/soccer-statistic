import React, { FC, useMemo } from 'react';
import styled from 'styled-components';

import { colors, Scrollbars } from '../../assets/theme';
import { MatchesPageProps } from '../../modules/types';
import MatchListItem from '../match-list-item';

const MatchListWrapper = styled(Scrollbars)`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;
const MatchListTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: none;
`;
const MatchListTableHead = styled.thead`
  width: 100%;
`;
const MatchListTableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${colors.lightgrey};
  }
`;
const MatchListTableHeadCall = styled.th`
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0.4rem;
  &:first-letter {
    text-transform: capitalize;
  }
`;
const MatchListTableBody = styled.tbody``;

const MatchList: FC<MatchesPageProps> = ({ items }) => {
  const properties = useMemo(
    () => ({
      date: 'date',
      matchday: 'matchday',
      fixture: 'fixture',
      score: 'score',
    }),
    []
  );
  const memorizedPropertyValues = useMemo(() => Object.values(properties), [
    properties,
  ]);
  const memorizedPropertyKeys = useMemo(() => Object.keys(properties), [
    properties,
  ]);
  return (
    <MatchListWrapper>
      <MatchListTable>
        <MatchListTableHead>
          <MatchListTableRow>
            {memorizedPropertyValues.map((property) => {
              return (
                <MatchListTableHeadCall key={property}>
                  {property}
                </MatchListTableHeadCall>
              );
            })}
          </MatchListTableRow>
        </MatchListTableHead>
        <MatchListTableBody>
          {items.map((item) => (
            <MatchListItem
              key={item.id}
              item={item}
              properties={memorizedPropertyKeys}
            />
          ))}
        </MatchListTableBody>
      </MatchListTable>
    </MatchListWrapper>
  );
};

export default MatchList;
