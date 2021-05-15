import React, { FC } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import upperFirst from 'lodash.upperfirst';

import { SelectFieldOptionType } from '../../modules/types';
import { sizes } from '../../assets/theme';
import SwitcherLanguageItemFlag from '../switcher-language-flag';

const SwitcherLanguageItemWrapper = styled.li`
  display: inline-flex;
  align-items: center;
  height: 100%;
  min-width: 0;
`;
const SwitcherLanguageItemFlagWrapper = styled.span`
  display: flex;
  width: 1.2rem;
  height: 1.2rem;
  overflow: hidden;
  border-radius: 50%;
`;
const SwitcherLanguageItemCaption = styled.span`
  display: none;
  @media screen and (min-width: ${sizes.md}) {
    padding: 0 0.5rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
  }
`;

const SwitcherLanguageItem: FC<SelectFieldOptionType> = (option) => {
  const { formatMessage } = useIntl();
  const { value } = option;
  let caption = formatMessage({ id: 'english' });
  switch (value) {
    case 'en': {
      caption = formatMessage({ id: 'english' });
      break;
    }
    case 'de': {
      caption = formatMessage({ id: 'german' });
      break;
    }
    case 'ru': {
      caption = formatMessage({ id: 'russian' });
      break;
    }
    default: {
      break;
    }
  }
  return (
    <SwitcherLanguageItemWrapper>
      <SwitcherLanguageItemFlagWrapper>
        <SwitcherLanguageItemFlag locale={String(value)} alt={caption} />
      </SwitcherLanguageItemFlagWrapper>
      <SwitcherLanguageItemCaption>
        {upperFirst(caption)}
      </SwitcherLanguageItemCaption>
    </SwitcherLanguageItemWrapper>
  );
};

export default SwitcherLanguageItem;
