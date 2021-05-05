import React, { FC } from 'react';
import styled from 'styled-components';
import { colors, sizes } from '../../assets/theme';

import { MatchProps } from '../../modules/types';
import { maskedDate, maskedTime } from '../../helpers';

const MatchDateWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (min-width: ${sizes.xs}) {
    flex-wrap: initial;
  }
`;

const MatchDateDate = styled.span`
  width: 5.714rem;
`;

const MatchDateTime = styled.span`
  width: 3.571rem;
  margin-left: 0.5rem;
`;

const MatchDateStatus = styled.span<{ status: string }>`
  padding: 0.3rem 0.5rem;
  margin-left: 0.5rem;
  text-transform: uppercase;
  background-color: ${({ status }) => {
    switch (status) {
      case 'SCHEDULED': {
        return colors.blue;
      }
      case 'IN_PLAY ': {
        return colors.green;
      }
      default: {
        return colors.grey;
      }
    }
  }};
  color: ${colors.white}};
  border-radius: 4px;
  display: none;

  @media(min-width: ${sizes.xs}) {
    display: initial;
  }
`;

const MatchDate: FC<MatchProps> = (props) => {
  const { status, utcDate } = props;
  return (
    <MatchDateWrapper>
      <MatchDateDate>{maskedDate(utcDate)}</MatchDateDate>
      <MatchDateTime>{maskedTime(utcDate)}</MatchDateTime>
      <MatchDateStatus status={status}>scheduled</MatchDateStatus>
    </MatchDateWrapper>
  );
};

export default MatchDate;
