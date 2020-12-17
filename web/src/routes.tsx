/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login'
import Listarcurtidas from './pages/Listarcurtidas'
import Curtir from './pages/Curtir'
import Menu from './pages/Menu'
import Recomendacoes from './pages/Recomendacoes'


function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/menu" component={Menu} />
        <Route path="/recomendacoes" component={Recomendacoes} />
        <Route path="/curtir" component={Curtir} />
        <Route path="/animelist" component={Listarcurtidas} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;