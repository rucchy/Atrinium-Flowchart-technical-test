import { Button, Col, Row } from 'antd'

import React from 'react'
import { addNode } from '../_actions'
import { useDispatch } from 'react-redux'

export default () => {
  const dispatch = useDispatch()
  const clickCallback = (type) => {
    dispatch(addNode(type))
  }

  return (
    <Row gutter={[8, 8]}>
      <Col sm={12}>
        <Button
          block
          type="primary"
          htmlType="button"
          onClick={() => clickCallback('gateway')}
        >
          Gateway
        </Button>
      </Col>
      <Col sm={12}>
        <Button
          block
          type="primary"
          htmlType="button"
          onClick={() => clickCallback('servicio')}
        >
          Servicio
        </Button>
      </Col>
      <Col sm={12}>
        <Button
          block
          type="primary"
          htmlType="button"
          onClick={() => clickCallback('pantalla')}
        >
          Pantalla
        </Button>
      </Col>
    </Row>
  )
}
