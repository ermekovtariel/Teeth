import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useRoutes } from './router';

function App() {
  const json = localStorage.getItem('user');
  const routes = useRoutes(json);

  return <Router>{routes}</Router>;
}

export default App;
