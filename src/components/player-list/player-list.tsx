import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { colors } from '../../assets/theme/variables';
import { PlayerProps } from '../../modules/types';
import { extractFormatMessage } from '../../helpers';
import PlayerListItem from '../player-list-item';

const PlayersTable = styled.table`
  border: none;
  border-collapse: collapse;
`;
const PlayersCaption = styled.caption`
  padding: 0.5rem 0;
  font-weight: bold;
  color: ${colors.grey};
  text-align: left;
  font-size: 0.9rem;

  &:first-letter {
    display: inline-block;
    text-transform: capitalize;
  }
`;
const PlayersTableHead = styled.thead`
  background-color: ${colors.lightgrey};
`;
const PlayersTableBody = styled.tbody``;
const PlayersTableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${colors.lightgrey};
  }
`;
const PlayersCellHeader = styled.th`
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0.4rem;
  &:first-letter {
    text-transform: capitalize;
  }
`;

const PlayerList: FC<{ items?: PlayerProps[] }> = ({ items }) => {
  const { formatMessage } = useIntl();
  const properties = useMemo(
    () => ({
      name: extractFormatMessage({
        id: 'name',
        formatMessage,
      }),
      position: extractFormatMessage({
        id: 'position',
        formatMessage,
      }),
      dateOfBirth: extractFormatMessage({
        id: 'date of birth',
        formatMessage,
      }),
      countryOfBirth: extractFormatMessage({
        id: 'country of birth',
        formatMessage,
      }),
      nationality: extractFormatMessage({
        id: 'nationality',
        formatMessage,
      }),
    }),
    [formatMessage]
  );
  const memorizedPropertyValues = useMemo(() => Object.values(properties), [
    properties,
  ]);
  const memorizedPropertyKeys = useMemo(() => Object.keys(properties), [
    properties,
  ]);
  const playersCaptionContent = extractFormatMessage({
    id: 'players',
    formatMessage,
  });
  return (
    <PlayersTable>
      <PlayersCaption>{playersCaptionContent}</PlayersCaption>
      <PlayersTableHead>
        <PlayersTableRow>
          {memorizedPropertyValues.map((property) => (
            <PlayersCellHeader scope="col" key={property}>
              {property}
            </PlayersCellHeader>
          ))}
        </PlayersTableRow>
      </PlayersTableHead>
      <PlayersTableBody>
        {items?.map((item) => (
          <PlayerListItem
            key={item.id}
            item={item}
            properties={memorizedPropertyKeys}
          />
        ))}
      </PlayersTableBody>
    </PlayersTable>
  );
};

export default PlayerList;
