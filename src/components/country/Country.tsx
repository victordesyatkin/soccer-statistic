import React, { FC } from 'react';
import styled from 'styled-components';

import { colors } from '../../assets/theme';

import { Area } from '../../modules/types';

const StyledCountry = styled.p`
  color: ${colors.grey};
  margin-top: 1rem;
  font-size: 0.786rem;
  text-transform: capitalize;
`;

const Country: FC<Area> = ({ name }) => {
  return <StyledCountry>{name}</StyledCountry>;
};

export default Country;
