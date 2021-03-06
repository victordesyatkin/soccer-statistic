import React from 'react';
import { useIntl } from 'react-intl';
import upperFirst from 'lodash.upperfirst';

import { LeaguesPageProps } from '../../modules/types';
import Panel from '../panel';
import Filter from '../filter';
import FilterButton from '../filter-button';
import SearchField from '../search-field';
import SelectField from '../select-field';
import Datepicker from '../datepicker';
import Breadcrumbs from '../breadcrumbs';
import LeagueList from '../league-list';
import Title from '../title';
import './leagues-page.scss';
import { extractFormatMessage } from '../../helpers';

const LeaguesPage: React.FC<LeaguesPageProps> = ({
  panel,
  filter,
  searchField,
  selectField,
  datepicker,
  items,
}) => {
  const className = 'leagues-page';
  const { formatMessage } = useIntl();
  const title = upperFirst(
    extractFormatMessage({
      id: 'leagues',
      formatMessage,
    })
  );
  return (
    <section className={className}>
      <div className={`${className}__header`}>
        <Breadcrumbs />
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
          <LeagueList items={items} />
        </div>
      </div>
      <Title title={title} />
    </section>
  );
};

export default LeaguesPage;
