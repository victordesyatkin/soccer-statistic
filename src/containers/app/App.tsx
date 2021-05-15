import React, { FC, useMemo } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { useIntl } from 'react-intl';

import store from '../../modules/store';
import ErrorBoundary from '../../components/error-boundary';
import { IntlProviderWrapper } from '../../components/hoc-helpers';
import App from '../../components/app';
import Modal from '../modal';
import { extractDefaultMessage } from '../../helpers';

const AppContainer: FC = () => {
  const { formatMessage } = useIntl();
  const header = useMemo(() => {
    const titleDefaultMessage = extractDefaultMessage('leagues');
    const titleMessage = titleDefaultMessage
      ? formatMessage(titleDefaultMessage)
      : '';
    const teamsDefaultMessage = extractDefaultMessage('teams');
    const teamsMessage = teamsDefaultMessage
      ? formatMessage(teamsDefaultMessage)
      : '';
    const matchesDefaultMessage = extractDefaultMessage('matches');
    const matchesMessage = matchesDefaultMessage
      ? formatMessage(matchesDefaultMessage)
      : '';
    const predictionsDefaultMessage = extractDefaultMessage('predictions');
    const predictionsMessage = predictionsDefaultMessage
      ? formatMessage(predictionsDefaultMessage)
      : '';
    const supportDefaultMessage = extractDefaultMessage('support');
    const supportMessage = supportDefaultMessage
      ? formatMessage(supportDefaultMessage)
      : '';
    const accountDefaultMessage = extractDefaultMessage('account');
    const accountMessage = accountDefaultMessage
      ? formatMessage(accountDefaultMessage)
      : '';
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
        placeholder: 'search',
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
