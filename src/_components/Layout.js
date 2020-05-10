import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import Editor from './Editor'
import Home from './Home'
import { Layout } from 'antd'
import React from 'react'

export default () => (
  <Layout className="layout">
    <Layout.Header>
      <h1>
        <a href="/">Prueba técnica Atrinium FrontEnd 2</a>
      </h1>
    </Layout.Header>
    <Router>
      <Switch>
        <Route path="/nuevo-diagrama" component={Editor} />
        <Route path="/ejemplo">
          <Editor idDiagram={2000} />
        </Route>
        <Route path="/" component={Home} />
      </Switch>
    </Router>

    <Layout.Footer style={{ textAlign: 'center' }}>
      Chema Ruano ©2020
    </Layout.Footer>
  </Layout>
)
