import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './views/login'

const routes = [
  // {
  //   path: '/diaryDetail/:id',
  //   component: DiaryDetail
  // },
  // {
  //   path: '/writeDiary',
  //   component: WriteDiary
  // },
  // {
  //   path: '/register',
  //   component: Register
  // },
  // {
  //   path: '/login',
  //   component: Login
  // },
  {
    path: '/',
    component: Login
  },
  // {
  //   path: '*',
  //   component: NoMatch
  // }
]
function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <Route {...route} key={index} />
        ))}
      </Switch>
    </Router>

  );
}

export default App;
