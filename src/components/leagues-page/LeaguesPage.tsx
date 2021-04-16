import React from 'react';

import Panel from '../panel';
import type { PanelProps } from '../panel';
import Filter, { FilterProps } from '../filter';
import FilterButton from '../filter-button';
import SearchField, { SearchFieldProps } from '../search-field';
import SelectField from '../select-field';
import { SelectFieldProps } from '../../modules/types';
import Datepicker, { DatepickerProps } from '../datepicker';
import Breadcrumbs from '../breadcrumbs';
import LeagueList from '../../containers/league-list';
import './leagues-page.scss';

type LeaguesPageProps = Partial<{
  panel: PanelProps;
  filter: FilterProps;
  searchField: SearchFieldProps;
  selectField: SelectFieldProps;
  datepicker: DatepickerProps;
  counter: number;
}>;

const LeaguesPage: React.FC<LeaguesPageProps> = ({
  panel,
  filter,
  searchField,
  selectField,
  datepicker,
}) => {
  const className = 'leagues-page';
  console.log('selectField : ', selectField);
  return (
    <section className={className}>
      <div className={`${className}__header`}>
        <Breadcrumbs content="Breadcrumbs" />
      </div>
      <div className={`${className}__control`}>
        <FilterButton {...filter} />
      </div>
      <div className={`${className}__body`}>
        <div className={`${className}__panel`}>
          <Panel {...panel}>
            <Filter {...filter}>
              <SearchField {...searchField} />
              <SelectField {...selectField} />
              <Datepicker {...datepicker} />
            </Filter>
          </Panel>
        </div>
        <div className={`${className}__list`}>
          <LeagueList />
        </div>
      </div>
    </section>
  );
};

export type { LeaguesPageProps };
export default LeaguesPage;
