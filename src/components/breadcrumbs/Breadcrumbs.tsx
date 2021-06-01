import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import {
  BreadcrumbsProps,
  ItemsTeamProps,
  ReducerProps,
} from '../../modules/types';
import { extractFormatMessage } from '../../helpers';
import Link from '../link';
import './breadcrumbs.scss';

const BreadcrumbsWrapper = styled.div`
  width: 100%;
`;

const BreadcrumbsSeparator = styled.span`
  padding: 0 0.3rem;
`;

const Breadcrumbs: FC<BreadcrumbsProps> = () => {
  const { formatMessage } = useIntl();
  const { pathname } = useLocation();
  const parts = pathname.split('/');
  const content = [
    <Link
      key="breadcrumbs-home_page"
      to="/"
      content={extractFormatMessage({ id: 'home_page', formatMessage })}
    />,
  ];
  const teams = useSelector<ReducerProps, ItemsTeamProps>(
    (state) => state.teams.items
  );
  let to = '/';
  parts.forEach((part: string, index: number) => {
    let item = part.trim().toLocaleLowerCase();
    if (item) {
      content.push(
        <BreadcrumbsSeparator key={`breadcrumbs-separator-${item}`}>
          -
        </BreadcrumbsSeparator>
      );
      to += `${item}/`;
      if (index && parts[index - 1] === 'teams') {
        const team = teams[item] || {};
        const { name } = team || {};
        if (name) {
          item = name;
        }
      }
      content.push(
        <Link
          key={`breadcrumbs-${item}`}
          to={to}
          content={extractFormatMessage({ id: item, formatMessage })}
        />
      );
    }
  });
  return <BreadcrumbsWrapper>{content}</BreadcrumbsWrapper>;
};

export default Breadcrumbs;
