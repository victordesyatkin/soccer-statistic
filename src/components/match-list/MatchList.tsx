import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { colors, Scrollbars } from '../../assets/theme';
import { MatchListProps } from '../../modules/types';
import MatchListItem from '../match-list-item';
import Nodata from '../no-data';

const MatchListWrapper = styled(Scrollbars)`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;
const MatchListTableCaption = styled.caption`
  font-size: 0.9rem;
  text-align: left;
  margin-bottom: 0.5rem;
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

const MatchList: FC<MatchListProps> = ({ items }) => {
  const { formatMessage } = useIntl();
  const properties = useMemo(
    () => ({
      date: formatMessage({ id: 'date' }),
      matchday: formatMessage({ id: 'matchday' }),
      fixture: formatMessage({ id: 'fixture' }),
      score: formatMessage({ id: 'score' }),
    }),
    [formatMessage]
  );
  const memorizedPropertyValues = useMemo(() => Object.values(properties), [
    properties,
  ]);
  const memorizedPropertyKeys = useMemo(() => Object.keys(properties), [
    properties,
  ]);
  const memorizedCaption = useMemo(
    () => `${items?.length} ${formatMessage({ id: 'matches_in_selection' })}:`,
    [items, formatMessage]
  );
  return (
    <MatchListWrapper>
      {items?.length ? (
        <MatchListTable>
          <MatchListTableCaption>{memorizedCaption}</MatchListTableCaption>
          <MatchListTableHead>
            <MatchListTableRow>
              {memorizedPropertyValues.map((property) => {
                return (
                  <MatchListTableHeadCall scope="col" key={property}>
                    {property}
                  </MatchListTableHeadCall>
                );
              })}
            </MatchListTableRow>
          </MatchListTableHead>
          <MatchListTableBody>
            {items?.map((item) => (
              <MatchListItem
                key={item.id}
                item={item}
                properties={memorizedPropertyKeys}
              />
            ))}
          </MatchListTableBody>
        </MatchListTable>
      ) : (
        <Nodata />
      )}
    </MatchListWrapper>
  );
};

export default MatchList;
