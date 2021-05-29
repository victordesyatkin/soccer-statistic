import React, { FC, useMemo } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { useIntl } from 'react-intl';

import store from '../../modules/store';
import ErrorBoundary from '../../components/error-boundary';
import App from '../../components/app';
import Modal from '../modal';
import { extractDefaultMessage, extractFormatMessage } from '../../helpers';

const AppContainer: FC = () => {
  const { formatMessage } = useIntl();
  const header = useMemo(() => {
    const titleMessage = extractFormatMessage({ id: 'leagues', formatMessage });
    const teamsMessage = extractFormatMessage({ id: 'teams', formatMessage });
    const matchesMessage = extractFormatMessage({
      id: 'matches',
      formatMessage,
    });
    const predictionsMessage = extractFormatMessage({
      id: 'predictions',
      formatMessage,
    });
    const supportMessage = extractFormatMessage({
      id: 'support',
      formatMessage,
    });
    const accountMessage = extractFormatMessage({
      id: 'account',
      formatMessage,
    });
    return {
      nav: {
        links: [
          {
            id: '1',
            title: titleMessage,
            content: titleMessage,
            to: '/leagues',
          },
          {
            id: '2',
            title: teamsMessage,
            content: teamsMessage,
            to: '/teams',
          },
          {
            id: '3',
            title: matchesMessage,
            content: matchesMessage,
            to: '/matches',
          },
          {
            id: '4',
            title: predictionsMessage,
            content: predictionsMessage,
          },
          {
            id: '5',
            title: supportMessage,
            content: supportMessage,
          },
          {
            id: '6',
            title: accountMessage,
            content: accountMessage,
          },
        ],
      },
      searchButton: {
        title: 'search',
      },
      searchField: {
        placeholder: extractFormatMessage({
          id: 'search',
          formatMessage,
        }),
      },
    };
  }, [formatMessage]);
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <HashRouter>
          <App header={header} />
          <Modal />
        </HashRouter>
      </ErrorBoundary>
    </Provider>
  );
};

export default AppContainer;
