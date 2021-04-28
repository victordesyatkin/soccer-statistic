import React, { FC } from 'react';
import styled from 'styled-components';

import { colors } from '../../assets/theme/variables';
import { maskedDate } from '../../helpers';
import { PlayerProps } from '../../modules/types';

const PlayersRow = styled.tr`
  &:nth-child(even) {
    background-color: ${colors.lightgrey};
  }
`;
const PlayersCell = styled.td`
  padding: 0.4rem;
  font-size: 0.7rem;
  white-space: wrap;
`;

const PlayerListItem: FC<{
  item: PlayerProps;
  properties: string[];
}> = ({ item, properties }) => {
  const { id: itemId } = item;
  const readyProperties = properties as (keyof PlayerProps)[];
  return (
    <PlayersRow key={`tr-${itemId}`}>
      {readyProperties.map((property) => {
        let readyProperty: string | undefined;
        if (property in item) {
          readyProperty = String(item[property]);
          if (readyProperty && property === 'dateOfBirth') {
            readyProperty = maskedDate(readyProperty) || 'n/a';
          }
        }
        return readyProperty ? (
          <PlayersCell key={`td-${itemId}-${property}`}>
            {readyProperty}
          </PlayersCell>
        ) : (
          'n/a'
        );
      })}
    </PlayersRow>
  );
};

export default PlayerListItem;
