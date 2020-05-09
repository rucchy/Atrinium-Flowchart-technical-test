import Contenido from './Contenido'
import { Layout } from 'antd'
import MenuNodes from './MenuNodes'
import NodoForm from './Form'
import React from 'react'

export default () => {
  return (
    <Layout className="layout">
      <Layout.Header>
        <h1> Prueba técnica Atrinium FrontEnd 2</h1>
      </Layout.Header>
      <Layout>
        <Layout.Sider style={{ padding: 16 }}>
          <MenuNodes />
        </Layout.Sider>
        <Layout.Content className="site-layout-content">
          <div className="container">
            <Contenido />
          </div>
        </Layout.Content>
        <Layout.Sider style={{ padding: 16 }}>
          <NodoForm />
        </Layout.Sider>
      </Layout>

      <Layout.Footer style={{ textAlign: 'center' }}>
        Chema Ruano ©2020
      </Layout.Footer>
    </Layout>
  )
}
