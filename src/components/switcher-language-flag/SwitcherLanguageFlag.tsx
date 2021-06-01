import React, { FC } from 'react';
import styled from 'styled-components';

import de from './images/de.svg';
import ru from './images/ru.svg';
import gb from './images/gb.svg';

const SwitcherLanguageItemFlagWrapper = styled.span`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
`;
const SwitcherLanguageItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
`;

const SwitcherLanguageItemFlag: FC<{ locale?: string; alt?: string }> = ({
  locale,
  alt,
}) => {
  let logo = gb;
  switch (locale) {
    case 'en': {
      logo = gb;
      break;
    }
    case 'de': {
      logo = de;
      break;
    }
    case 'ru': {
      logo = ru;
      break;
    }
    default: {
      break;
    }
  }
  return (
    <SwitcherLanguageItemFlagWrapper>
      <SwitcherLanguageItemImage src={logo} alt={String(alt)} />
    </SwitcherLanguageItemFlagWrapper>
  );
};

export default SwitcherLanguageItemFlag;
