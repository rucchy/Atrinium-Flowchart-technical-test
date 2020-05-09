import { Form, Input, InputNumber } from 'antd'
import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'

const TAMANOMIN = {
  'basic.Circle': 50,
  'basic.Rhombus': 80,
  'basic.Rect': 80,
  'standard.Polygon': 80,
}

const NodoForm = () => {
  const nodo = useSelector((store) => store.FormReducer.node)
  const [form] = Form.useForm()

  useEffect(() => {
    if (nodo) {
      const tamano = nodo.size()

      form.setFieldsValue({
        texto: nodo.attr('text/text'),
        width: tamano.width,
        height: tamano.height,
      })
    }
  }, [form, nodo])

  const changeText = (changedValues, allValues) => {
    const field = Object.keys(changedValues)[0]
    switch (field) {
      case 'texto':
        nodo.attr('text/text', changedValues.texto)
        break
      case 'width':
        if (
          !isNaN(changedValues.width) &&
          changedValues.width >= TAMANOMIN[nodo.attributes.type]
        )
          nodo.resize(changedValues.width, allValues.height)
        if (changedValues.height === null) {
          form.setFieldsValue({
            width: TAMANOMIN[nodo.attributes.type],
          })
          nodo.resize(TAMANOMIN[nodo.attributes.type], allValues.height)
        }
        break
      case 'height':
        if (
          !isNaN(changedValues.height) &&
          changedValues.height >= TAMANOMIN[nodo.attributes.type]
        )
          nodo.resize(allValues.width, changedValues.height)
        if (changedValues.height === null) {
          form.setFieldsValue({
            height: TAMANOMIN[nodo.attributes.type],
          })
          nodo.resize(allValues.width, TAMANOMIN[nodo.attributes.type])
        }
        break
      default:
    }
  }

  return (
    <div>
      {nodo && (
        <Form form={form} layout="vertical" onValuesChange={changeText}>
          <Form.Item label="Texto" name="texto">
            <Input />
          </Form.Item>
          <Form.Item label="Alto" name="height">
            <InputNumber min={TAMANOMIN[nodo.attributes.type]} />
          </Form.Item>
          <Form.Item label="Ancho" name="width">
            <InputNumber min={TAMANOMIN[nodo.attributes.type]} />
          </Form.Item>
        </Form>
      )}
    </div>
  )
}

export default connect(null, {})(NodoForm)
