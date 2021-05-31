import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { extractFormatMessage } from '../../helpers';
import { colors } from '../../assets/theme/variables';
import { TeamProps } from '../../modules/types';
import TeamColors from '../team-colors';

const TeamInfoWrapper = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TeamInfoDescription = styled.span`
  display: inline-block;
  color: ${colors.grey};
  padding-right: 0.6rem;
  font-size: 0.9rem;
  &::first-letter {
    text-transform: uppercase;
  }
`;

const TeamInfoItem = styled.p`
  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 0;
  display: flex;
  align-items: center;
`;

const TeamInfoHeader = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
`;

const TeamInfoBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TeamInfoLogoWrapper = styled.div`
  width: 3.571rem;
  height: 3.571rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

const TeamInfoLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const TeamInfoName = styled.p`
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TeamInfo: FC<TeamProps> = (props) => {
  const { formatMessage } = useIntl();
  const properties: Record<string, string> = useMemo(
    () => ({
      shortName: extractFormatMessage({ id: 'short_name', formatMessage }),
      address: extractFormatMessage({ id: 'address', formatMessage }),
      phone: extractFormatMessage({ id: 'phone', formatMessage }),
      website: extractFormatMessage({ id: 'website', formatMessage }),
      email: extractFormatMessage({ id: 'email', formatMessage }),
      founded: extractFormatMessage({ id: 'founded', formatMessage }),
      clubColors: extractFormatMessage({ id: 'club_colors', formatMessage }),
    }),
    [formatMessage]
  );
  const memorizedPropertiesKeys = useMemo(() => Object.keys(properties), [
    properties,
  ]);
  const { id, logo, name } = props;
  return (
    <TeamInfoWrapper>
      <TeamInfoHeader>
        <TeamInfoLogoWrapper>
          <TeamInfoLogo src={logo} alt={name} title={name} />
        </TeamInfoLogoWrapper>
        <TeamInfoName>{name}</TeamInfoName>
      </TeamInfoHeader>
      <TeamInfoBody>
        {memorizedPropertiesKeys.map((propertyKey) => {
          const property = properties[propertyKey];
          const readyPropertyKey = propertyKey as keyof TeamProps;
          let value = 'n_a';
          if (readyPropertyKey in props) {
            value = String(props[readyPropertyKey]);
          }
          return (
            <TeamInfoItem key={`${id}-${property}`}>
              <TeamInfoDescription>{property}:</TeamInfoDescription>
              {readyPropertyKey === 'clubColors' ? (
                <TeamColors id={id} colors={value} />
              ) : (
                value
              )}
            </TeamInfoItem>
          );
        })}
      </TeamInfoBody>
    </TeamInfoWrapper>
  );
};

export default TeamInfo;
