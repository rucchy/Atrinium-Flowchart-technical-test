import { Button, Form, Input, InputNumber } from 'antd'
import React, { useEffect } from 'react'
import {
  SHAPES_DEFAULT_SIZE,
  SHAPES_NODES,
  SHAPES_NODES_INVERSE,
} from './Nodes/constants'
import { useDispatch, useSelector } from 'react-redux'

import { changeForm } from '../_actions'
import sendServer from '../_helpers/sendServer'

export default () => {
  const nodo = useSelector((store) => store.FormReducer.node)
  const diagramId = useSelector((store) => store.FormReducer.diagramId)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    if (nodo) {
      const datos = sendServer('getNodo', {
        diagramId: diagramId,
        nodeId: nodo.id,
        //Este parametro no habría que enviarlo pero lo utilizo para falsear los datos que devuelve el servidor
        nodeType:
          SHAPES_NODES_INVERSE[nodo.attributes.type] === 'INICIO' &&
          nodo.attr('text/text') === 'Fin'
            ? 'FIN'
            : SHAPES_NODES_INVERSE[nodo.attributes.type],
      })

      const tamano = nodo.size()

      form.setFieldsValue({
        texto: nodo.attr('text/text'),
        width: tamano.width,
        height: tamano.height,
        caracteristicas: datos.caracteristicasPANTALLA
          ? datos.caracteristicasPANTALLA
          : datos.caracteristicasSERVICIO
          ? datos.caracteristicasSERVICIO
          : null,
      })
    }
  }, [form, diagramId, nodo])

  const changeText = (changedValues, allValues) => {
    const field = Object.keys(changedValues)[0]
    switch (field) {
      case 'texto':
        nodo.attr('text/text', changedValues.texto)
        sendServer('changeNameNode', {
          diagramId: diagramId,
          nodeId: nodo.id,
          name: changedValues.texto,
        })
        break
      case 'width':
        if (
          !isNaN(changedValues.width) &&
          changedValues.width >= SHAPES_DEFAULT_SIZE[nodo.attributes.type]
        ) {
          nodo.resize(changedValues.width, allValues.height)
          sendServer('changeWidthNode', {
            diagramId: diagramId,
            nodeId: nodo.id,
            width: changedValues.width,
          })
        }
        if (changedValues.width === null) {
          form.setFieldsValue({
            width: SHAPES_DEFAULT_SIZE[nodo.attributes.type],
          })
          nodo.resize(
            SHAPES_DEFAULT_SIZE[nodo.attributes.type],
            allValues.height,
          )
          sendServer('changeWidthNode', {
            diagramId: diagramId,
            nodeId: nodo.id,
            width: SHAPES_DEFAULT_SIZE[nodo.attributes.type],
          })
        }
        break
      case 'height':
        if (
          !isNaN(changedValues.height) &&
          changedValues.height >= SHAPES_DEFAULT_SIZE[nodo.attributes.type]
        ) {
          nodo.resize(allValues.width, changedValues.height)
          sendServer('changeHeightNode', {
            diagramId: diagramId,
            nodeId: nodo.id,
            height: changedValues.height,
          })
        }
        if (changedValues.height === null) {
          form.setFieldsValue({
            height: SHAPES_DEFAULT_SIZE[nodo.attributes.type],
          })
          nodo.resize(
            allValues.width,
            SHAPES_DEFAULT_SIZE[nodo.attributes.type],
          )
          sendServer('changeHeightNode', {
            diagramId: diagramId,
            nodeId: nodo.id,
            height: SHAPES_DEFAULT_SIZE[nodo.attributes.type],
          })
        }
        break
      case 'caracteristicas':
        sendServer(
          'changeCaracteristicas' + SHAPES_NODES_INVERSE[nodo.attributes.type],
          {
            diagramId: diagramId,
            nodeId: nodo.id,
            ['caracteristicas' +
            SHAPES_NODES_INVERSE[
              nodo.attributes.type
            ]]: changedValues.caracteristicas,
          },
        )
        break
      default:
    }
  }

  const deleteNode = () => {
    nodo.remove()
    dispatch(changeForm())
  }

  return (
    <div>
      {nodo && (
        <div>
          <Form
            form={form}
            layout="vertical"
            onValuesChange={changeText}
            id={nodo.id}
          >
            <Form.Item label="Texto" name="texto">
              <Input />
            </Form.Item>
            <Form.Item label="Alto" name="height">
              <InputNumber min={60} />
            </Form.Item>
            <Form.Item label="Ancho" name="width">
              <InputNumber min={60} />
            </Form.Item>
            {['PANTALLA', 'SERVICIO'].includes(
              SHAPES_NODES_INVERSE[nodo.attributes.type],
            ) && (
              <Form.Item
                label={
                  'Caracteristicas de ' +
                  SHAPES_NODES_INVERSE[nodo.attributes.type]
                }
                name={'caracteristicas'}
              >
                <Input />
              </Form.Item>
            )}
          </Form>
          {nodo.attributes.type !== SHAPES_NODES.INICIO && (
            <Button
              block
              type="primary"
              htmlType="button"
              danger
              onClick={() => deleteNode()}
            >
              Borrar Nodo
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
