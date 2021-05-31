import React, { FC } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import upperFirst from 'lodash.upperfirst';

import { sizes } from '../../assets/theme';
import { TeamsPageProps } from '../../modules/types';
import { extractFormatMessage } from '../../helpers';
import Panel from '../panel';
import Filter from '../filter';
import FilterButton from '../filter-button';
import SearchField from '../search-field';
import SelectField from '../select-field';
import Breadcrumbs from '../breadcrumbs';
import TeamList from '../team-list';
import Title from '../title';

const Section = styled.section`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  flex-direction: column;
`;
const BreadcrumbsWrapper = styled.div`
  padding: 1rem 0;
`;
const Control = styled.div`
  padding: 1rem 0;
  display: flex;

  @media (min-width: ${sizes.md}) {
    display: none;
  }
`;
const Body = styled.div`
  display: flex;
  width: 100%;
`;
const WrappedPanel = styled.div`
  min-width: 0;
  max-width: 20rem;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  @media (min-width: ${sizes.md}) {
    min-width: 20rem;
  }
`;
const List = styled.div`
  display: flex;
  width: 100%;
  min-width: 0;
  padding: 1rem;
`;

const TeamsPage: FC<TeamsPageProps> = ({
  panel,
  filter,
  searchField,
  selectFieldCountries,
  selectFieldLeagues,
  items,
}) => {
  const { formatMessage } = useIntl();
  const title = upperFirst(
    extractFormatMessage({ id: 'teams', formatMessage })
  );
  return (
    <Section>
      <BreadcrumbsWrapper>
        <Breadcrumbs />
      </BreadcrumbsWrapper>
      <Control>
        <FilterButton {...filter} />
      </Control>
      <Body>
        <WrappedPanel>
          <Panel {...panel}>
            <Filter {...filter}>
              <SearchField {...searchField} />
              <SelectField {...selectFieldCountries} />
              <SelectField {...selectFieldLeagues} />
            </Filter>
          </Panel>
        </WrappedPanel>
        <List>
          <TeamList items={items} />
        </List>
      </Body>
      <Title title={title} />
    </Section>
  );
};

export default TeamsPage;
