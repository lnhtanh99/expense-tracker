import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SpeechProvider } from '@speechly/react-client';

import { Provider } from './context/context';

ReactDOM.render(
  <SpeechProvider appId="01aec89a-a833-4b0f-98f8-999a1e2d68ff" language="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById('root')
);

