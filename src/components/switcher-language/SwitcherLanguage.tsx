import React, { FC, useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import upperFirst from 'lodash.upperfirst';

import { withIntl } from '../hoc-helpers';
import { IntlContextProps } from '../../modules/types';
import SelectField from '../select-field';
import SwitcherLanguageItem from '../switcher-language-item';

const SwitcherLanguageWrapper = styled.article`
  width: 100%;
`;

const SwitcherLanguage: FC<IntlContextProps> = ({ selectLanguage }) => {
  const { formatMessage, locale } = useIntl();
  const languages = useMemo(
    () => [
      {
        id: 'en',
        value: 'en',
        content: upperFirst(formatMessage({ id: 'english' })),
      },
      {
        id: 'de',
        value: 'de',
        content: upperFirst(formatMessage({ id: 'german' })),
      },
      {
        id: 'ru',
        value: 'ru',
        content: upperFirst(formatMessage({ id: 'russian' })),
      },
    ],
    [formatMessage]
  );
  const onChangeSelectField = useCallback(
    (value?: string[]) => {
      if (selectLanguage && value?.length) {
        const [language] = value;
        selectLanguage(language);
      }
    },
    [selectLanguage]
  );
  const customRenderItem = useCallback(
    (item) => (
      <SwitcherLanguageItem
        {...item}
        key={`switcher-language-item-${item.id}-${item.value}`}
      />
    ),
    []
  );
  const customRenderOption = useCallback(
    (item) => (
      <SwitcherLanguageItem
        {...item}
        key={`switcher-language-option-${item.id}-${item.value}`}
      />
    ),
    []
  );
  const memorizedSelectField = useMemo(
    () => ({
      label: undefined,
      placeholder: upperFirst(formatMessage({ id: 'please_select_language' })),
      options: languages,
      isMultiple: false,
      withControl: false,
      value: locale,
      onChange: onChangeSelectField,
      customRenderItem,
      customRenderOption,
      theme: 'small',
      isManagement: true,
    }),
    [
      languages,
      formatMessage,
      locale,
      onChangeSelectField,
      customRenderItem,
      customRenderOption,
    ]
  );
  return (
    <SwitcherLanguageWrapper>
      <SelectField {...memorizedSelectField} />
    </SwitcherLanguageWrapper>
  );
};

export default withIntl()(SwitcherLanguage);
