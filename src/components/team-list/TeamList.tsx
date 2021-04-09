import React from 'react';

import { TeamsProps, TeamProps } from '../../modules/types';

import TeamListItem from '../team-list-item ';
import './team-list.scss';

const TeamList: React.FC<TeamsProps> = ({ items }) => {
  const className = 'team-list';
  const renderItem = (props: TeamProps) => {
    const { id } = props;
    return (
      <li className={`${className}__item`} key={id}>
        <TeamListItem {...props} />
      </li>
    );
  };
  return <ul className={className}>{items?.map(renderItem)}</ul>;
};

export default TeamList;
