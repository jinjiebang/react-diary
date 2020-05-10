import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'
import Login from './views/login'
import Register from './views/register'
import Index from './views';
import WriteDiary from './views/write-diary'
import DiaryDetail from './views/diary-detail';

const routes = [
  {
    path: '/diaryDetail/:id',
    component: DiaryDetail
  },
  {
    path: '/writeDiary',
    component: WriteDiary
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/index',
    component: Index
  },
  {
    path: '/',
    component: Login
  },
  {
    path: '*',
    component: NoMatch
  }
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
function NoMatch() {
  let location = useLocation()

  return (
    <div>
      <h3>No match for {location.pathname}</h3>
    </div>
  )
}
export default App;
