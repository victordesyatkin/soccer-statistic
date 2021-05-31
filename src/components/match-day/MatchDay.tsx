import React, { FC } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { sizes } from '../../assets/theme';
import { MatchProps } from '../../modules/types';
import { flags, extractFormatMessage } from '../../helpers';

const MatchDayWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (min-width: ${sizes.xs}) {
    flex-wrap: nowrap;
  }
`;

const MatchDayNumber = styled.span`
  width: 2rem;
`;

const MatchDayCountryFlag = styled.span`
  width: 1.428rem;
  height: 1.071rem;
`;

const MatchDayCountryFlagImage = styled.img`
  width: 100%;
  height: 100%;
`;

const MatchDay: FC<MatchProps> = (props) => {
  const { formatMessage } = useIntl();
  const { matchday = '-', competition } = props;
  const { area } = competition;
  const { ensignUrl, name, code = '' } = area || {};
  let src = ensignUrl;
  if (!src) {
    const readyCode = code.toLocaleLowerCase() as keyof typeof flags;
    src = flags[readyCode];
  }
  const flag = src ? <MatchDayCountryFlagImage src={src} alt={name} /> : null;
  return (
    <MatchDayWrapper>
      <MatchDayNumber>
        {matchday || extractFormatMessage({ id: 'n_a', formatMessage })}
      </MatchDayNumber>
      <MatchDayCountryFlag>{flag}</MatchDayCountryFlag>
    </MatchDayWrapper>
  );
};

export default MatchDay;
