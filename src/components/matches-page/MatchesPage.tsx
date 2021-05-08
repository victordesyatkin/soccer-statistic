import React, { FC } from 'react';
import styled from 'styled-components';

import { sizes } from '../../assets/theme';
import { MatchesPageProps } from '../../modules/types';
import Breadcrumbs from '../breadcrumbs';
import MatchList from '../match-list';
import FilterButton from '../filter-button';
import Panel from '../panel';
import SearchField from '../search-field';
import SelectField from '../select-field';
import Filter from '../filter';
import Datepicker from '../datepicker';

const MatchesPageWrapper = styled.div`
  width: 100%;
  display: flex;
  min-width: 0;
  align-items: flex-start;
`;
const MatchesPageMatchListWrapper = styled.div`
  align-items: flex-start;
  width: 100%;
  display: flex;
  min-width: 0;
  padding: 0 1rem 1rem;
`;
const MatchesPagePanelWrapper = styled.div`
  align-items: flex-start;
  max-width: 21.428rem;
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  min-width: 0;
`;

const Section = styled.section`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  flex-direction: column;
`;

const StyledBreadcrumbs = styled(Breadcrumbs)`
  padding: 1rem 0;
`;
const Control = styled.div`
  padding: 1rem 0;
  display: flex;

  @media (min-width: ${sizes.md}) {
    display: none;
  }
`;

const MatchesPage: FC<MatchesPageProps> = ({
  panel,
  filter,
  searchField,
  selectFieldLeagues,
  selectFieldStatus,
  datepicker,
  items,
}) => {
  return (
    <Section>
      <StyledBreadcrumbs content="Breadcrumbs" />
      <Control>
        <FilterButton />
      </Control>
      <MatchesPageWrapper>
        <MatchesPagePanelWrapper>
          <Panel {...panel}>
            <Filter {...filter}>
              <SearchField {...searchField} />
              <SelectField {...selectFieldLeagues} />
              <SelectField {...selectFieldStatus} />
              <Datepicker {...datepicker} />
            </Filter>
          </Panel>
        </MatchesPagePanelWrapper>
        <MatchesPageMatchListWrapper>
          <MatchList items={items} />
        </MatchesPageMatchListWrapper>
      </MatchesPageWrapper>
    </Section>
  );
};

export default MatchesPage;
