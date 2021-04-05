import React from 'react';

import Panel from '../panel';
import type { PanelProps } from '../panel';
import Filter, { FilterProps } from '../filter';
import FilterButton from '../filter-button';
import SearchField, { SearchFieldProps } from '../search-field';
import SelectField, { SelectFieldProps } from '../select-field';
import Datepicker, { DatepickerProps } from '../datepicker';

import './leagues-page.scss';
import Breadcrumbs from '../breadcrumbs';

type LeaguesPageProps = Partial<{
  panel: PanelProps;
  filter: FilterProps;
  searchField: SearchFieldProps;
  selectField: SelectFieldProps;
  datepicker: DatepickerProps;
}>;

const LeaguesPage: React.FC<LeaguesPageProps> = ({
  panel,
  filter,
  searchField,
  selectField,
  datepicker,
}) => {
  console.log('searchField : ', searchField);
  const className = 'leagues-page';
  return (
    <section className={className}>
      <div className={`${className}__header`}>
        <Breadcrumbs content="Breadcrumbs" />
      </div>
      <div className={`${className}__control`}>
        <FilterButton {...filter} />
      </div>
      <div className={`${className}__panel`}>
        <Panel {...panel}>
          <Filter {...filter}>
            <SearchField {...searchField} />
            <SelectField {...selectField} />
            <Datepicker {...datepicker} />
          </Filter>
        </Panel>
      </div>
    </section>
  );
};

export type { LeaguesPageProps };
export default LeaguesPage;
