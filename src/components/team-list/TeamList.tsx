import React, { FC, useMemo } from 'react';
import styled from 'styled-components';

import { getRoutes } from '../../helpers';
import { TeamProps } from '../../modules/types';
import Nodata from '../no-data';
import Link from '../link';
import TeamListItem from '../team-list-item';

const Li = styled.li`
  padding: 1rem;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  width: 100%;
`;

const TeamList: FC<{ items?: TeamProps[] }> = ({ items }) => {
  const routes = useMemo(() => getRoutes(), []);
  const renderItem = (props: TeamProps) => {
    const { id } = props;
    return (
      <Li key={id}>
        <Link to={`${routes.TEAMS}/${id}`}>
          <TeamListItem {...props} />
        </Link>
      </Li>
    );
  };
  const itemLength = useMemo(() => items?.length, [items]);
  return itemLength ? <Ul>{items?.map(renderItem)}</Ul> : <Nodata />;
};

export default TeamList;
