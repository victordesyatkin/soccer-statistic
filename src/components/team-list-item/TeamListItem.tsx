import React, { FC } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import { colors } from '../../assets/theme';
import { TeamProps } from '../../modules/types';
import Country from '../country';
import Nodata from '../no-data';

const Team = styled.article`
  width: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${colors.lightgrey};
  text-align: center;
  border-radius: 4px;
  border-bottom: 3px solid;
  background-color: ${colors.white};
`;

const Logo = styled.div`
  width: 7rem;
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${rgba(colors.lightgrey, 0.3)};
  border-radius: 4px;
`;

const Image = styled.img`
  width: 100%;
  object-fit: contain;
  object-position: center center;
`;

const Name = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.929rem;
  color: ${colors.grey};
  margin-top: 3rem;
`;

const TeamListItem: FC<TeamProps> = (props) => {
  const { logo, name, area } = props;
  return (
    <Team>
      <Logo>
        {logo ? <Image src={logo} alt={name} title={name} /> : <Nodata />}
      </Logo>
      <Name>{name}</Name>
      <Country {...area} />
    </Team>
  );
};

export default TeamListItem;
