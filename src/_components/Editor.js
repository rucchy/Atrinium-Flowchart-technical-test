import Contenido from './Contenido'
import { Layout } from 'antd'
import MenuNodes from './MenuNodes'
import NodoForm from './Form'
import React from 'react'
export default ({ idDiagram }) => (
  <Layout>
    <Layout.Sider style={{ padding: 16 }}>
      <MenuNodes />
    </Layout.Sider>
    <Layout.Content className="site-layout-content">
      <Contenido idDiagram={idDiagram} />
    </Layout.Content>
    <Layout.Sider style={{ padding: 16 }}>
      <NodoForm />
    </Layout.Sider>
  </Layout>
)
