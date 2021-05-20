import React, { FC } from 'react';
import styled, { CSSObject } from 'styled-components';
import toHex from 'colornames';

import { colors as themeColors } from '../../assets/theme/variables';

const TeamColorWrapper = styled.span``;

const TeamColorItem = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${(props: CSSObject) => props['background-color']};
  margin-right: 0.5rem;
  border: 1px solid ${themeColors.lightgrey};
`;

const TeamColors: FC<{ colors?: string; id: number }> = ({ colors, id }) => {
  let parts: string[] | undefined;
  if (colors?.trim()) {
    parts = colors.toLocaleLowerCase().split('/');
  }
  return (
    <TeamColorWrapper>
      {parts
        ? parts.map((backgroundColor) => (
            // eslint-disable-next-line react/jsx-indent
            <TeamColorItem
              key={`${id}-background-color-${backgroundColor.trim()}}`}
              background-color={toHex(backgroundColor.trim())}
            />
          ))
        : 'n/a'}
    </TeamColorWrapper>
  );
};

export default TeamColors;
