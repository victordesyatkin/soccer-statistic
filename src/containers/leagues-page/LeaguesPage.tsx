import React from 'react';
import { connect, MapStateToPropsParam } from 'react-redux';

import LeaguesPage, { LeaguesPageProps } from '../../components/leagues-page';

const props: LeaguesPageProps = {
  searchField: {
    placeholder: 'Search',
    label: {
      content: 'Name',
    },
  },
  selectField: {
    placeholder: 5,
    value: ['dog', 'cat', 'hamster', 'dog1'],
    options: [
      { value: 'dog', content: 'Dog', id: 1 },
      { value: 'cat', content: 'Cat', id: 2 },
      { value: 'hamster', content: 'Hamster', isDisabled: true, id: 3 },
      { value: 'dog1', content: 'Dog', id: 4 },
      { value: 'cat1', content: 'Cat', id: 5 },
      {
        value: 'hamster1',
        content: 'Hamster',
        isDisabled: true,
        id: 6,
      },
      { value: 'dog2', content: 'Dog', id: 7 },
      { value: 'cat2', content: 'Cat', id: 8 },
      {
        value: 'hamster2',
        content: 'Hamster',
        isDisabled: true,
        id: 9,
      },
      { value: 'dog3', content: 'Dog', id: 10 },
      { value: 'cat3', content: 'Cat', id: 11 },
      {
        value: 'hamster3',
        content: 'Hamster',
        isDisabled: true,
        id: 12,
      },
      { value: 'dog4', content: 'Dog', id: 13 },
      { value: 'cat4', content: 'Cat', id: 14 },
      {
        value: 'hamster4',
        content: 'Hamster',
        isDisabled: true,
        id: 15,
      },
      { value: 'dog5', content: 'Dog', id: 16 },
      { value: 'cat5', content: 'Cat', id: 17 },
      {
        value: 'hamster5',
        content: 'Hamster',
        isDisabled: true,
        id: 18,
      },
      { value: 'dog6', content: 'Dog', id: 19 },
      { value: 'cat6', content: 'Cat', id: 20 },
      {
        value: 'hamster6',
        content: 'Hamster',
        isDisabled: true,
        id: 21,
      },
      { value: 'dog7', content: 'Dog', id: 22 },
      { value: 'cat7', content: 'Cat', id: 23 },
      {
        value: 'hamster7',
        content: 'Hamster',
        isDisabled: true,
        id: 24,
      },
      { value: 'dog8', content: 'Dog', id: 25 },
      { value: 'cat8', content: 'Cat', id: 26 },
      {
        value: 'hamster8',
        content: 'Hamster',
        isDisabled: true,
        id: 27,
      },
      { value: 'dog9', content: 'Dog', id: 28 },
      { value: 'cat9', content: 'Cat', id: 29 },
      {
        value: 'hamster9',
        content: 'Hamster',
        isDisabled: true,
        id: 30,
      },
      { value: 'dog10', content: 'Dog', id: 31 },
      { value: 'cat10', content: 'Cat', id: 32 },
      {
        value: 'hamster10',
        content: 'Hamster',
        isDisabled: true,
        id: 33,
      },
      { value: 'dog11', content: 'Dog', id: 34 },
      { value: 'cat11', content: 'Cat', id: 35 },
      {
        value: 'hamster11',
        content: 'Hamster',
        isDisabled: true,
        id: 36,
      },
      { value: 'dog12', content: 'Dog', id: 37 },
      { value: 'cat12', content: 'Cat', id: 38 },
      {
        value: 'hamster13',
        content: 'Hamster',
        isDisabled: true,
        id: 39,
      },
      { value: 'dog14', content: 'Dog', id: 40 },
      { value: 'cat', content: 'Cat', id: 41 },
      {
        value: 'hamster15',
        content: 'Hamster',
        isDisabled: true,
        id: 42,
      },
      { value: 'dog16', content: 'Dog', id: 43 },
      { value: 'cat16', content: 'Cat', id: 44 },
      {
        value: 'hamster17',
        content: 'Hamster',
        isDisabled: true,
        id: 45,
      },
    ],
    label: {
      content: 'Countries',
    },
  },
  datepicker: {
    calendar: {
      start: new Date('08-08-2021'),
      options: {
        range: true,
      },
    },
    label: {
      content: 'Dates',
    },
  },
  panel: {
    title: 'Filter',
  },
};

type LeaguesPageContainerProps = {};

const LeaguesPageContainer: React.FC<LeaguesPageContainerProps> = () => {
  return <LeaguesPage />;
};

export default LeaguesPageContainer;
