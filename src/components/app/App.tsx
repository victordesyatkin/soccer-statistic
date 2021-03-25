import React from 'react';
import 'normalize.css';

import '../../assets/theme/global.scss';
import Header from '../header';
import SelectField from '../select-field';
import './app.scss';

function App(): JSX.Element {
  return (
    <div className="app">
      <div className="app__header">
        <Header
          {...{
            nav: {
              links: [
                {
                  id: '1',
                  title: 'Leagues',
                  content: 'Leagues',
                },
                {
                  id: '2',
                  title: 'Teams',
                  content: 'Teams',
                },
                {
                  id: '3',
                  title: 'Matches',
                  content: 'Matches',
                },
                {
                  id: '4',
                  title: 'Matches',
                  content: 'Matches',
                },
                {
                  id: '5',
                  title: 'Predictions',
                  content: 'Predictions',
                },
                {
                  id: '6',
                  title: 'Support',
                  content: 'Support',
                },
                {
                  id: '7',
                  title: 'Account',
                  content: 'Account',
                },
              ],
            },
            searchButton: {
              title: 'Search',
            },
            searchField: {
              placeholder: 'Search',
            },
          }}
        />
      </div>
      <div className="app__main">
        <div>
          <SelectField
            options={[
              { value: 'dog', content: 'Dog', id: 1 },
              { value: 'cat', content: 'Cat', id: 2 },
              { value: 'hamster', content: 'Hamster', isDisabled: true, id: 3 },
            ]}
          />
        </div>
      </div>
      <div className="app__footer">Header</div>
    </div>
  );
}

export default App;
