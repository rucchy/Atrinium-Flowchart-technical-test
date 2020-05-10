import { Button, Layout } from 'antd'

import { Link } from 'react-router-dom'
import React from 'react'

export default () => (
  <Layout>
    <div
      className="container"
      style={{ justifyContent: 'space-between', display: 'flex' }}
    >
      <Button type="primary" shape="round" size="large" style={{ width: 400 }}>
        <Link to="/nuevo-diagrama">Nuevo Diagrama</Link>
      </Button>
      <Button type="primary" shape="round" size="large" style={{ width: 400 }}>
        <Link to="/ejemplo">Diagrama Ejemplo</Link>
      </Button>
    </div>
  </Layout>
)
