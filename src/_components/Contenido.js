import 'jointjs/css/layout.css'

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Fin from './Nodes/Fin'
import Gateway from './Nodes/Gateway'
import { Graph } from 'jointjs/src/dia/Graph'
import Inicio from './Nodes/Inicio'
import Pantalla from './Nodes/Pantalla'
import { Paper } from 'jointjs/src/dia/Paper'
import Servicio from './Nodes/Servicio'
import { changeForm } from '../_actions'

export default () => {
  const [graph, setGraph] = useState(null)
  const playground = useRef(null)
  const dispatch = useDispatch()
  const nuevoNodo = useSelector((store) => store.NodeReducer)

  useEffect(() => {
    const graphAux = new Graph()
    setGraph(graphAux)

    const paperAux = new Paper({
      el: playground.current,
      width: '100%',
      height: 500,
      model: graphAux,
      gridSize: 10,
      drawGrid: true,
    })

    Inicio().addTo(graphAux)

    Fin().addTo(graphAux)

    paperAux.on('element:pointerclick', function (element) {
      dispatch(changeForm(element.model))
    })
  }, [dispatch])

  useEffect(() => {
    if (graph && nuevoNodo.nodeType) {
      switch (nuevoNodo.nodeType) {
        case 'gateway':
          Gateway().addTo(graph)
          break
        case 'servicio':
          Servicio().addTo(graph)
          break
        case 'pantalla':
          Pantalla().addTo(graph)
          break

        default:
      }
    }
  }, [graph, nuevoNodo])

  return <div id="playground" ref={playground}></div>
}
