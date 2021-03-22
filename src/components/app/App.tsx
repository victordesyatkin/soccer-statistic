import React from 'react';
import 'normalize.css';

import '../../assets/theme/global.scss';
// import Header from '../header';
import Link from '../link';
import './app.scss';

function App(): JSX.Element {
  return (
    <div className="app">
      <div className="app__header">
        <Link href="/">Here</Link>
      </div>
      <div className="app__main">Header</div>
      <div className="app__footer">Header</div>
    </div>
  );
}

export default App;
