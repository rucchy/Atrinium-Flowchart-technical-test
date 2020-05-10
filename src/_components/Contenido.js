import 'jointjs/css/layout.css'
import 'jointjs/css/themes/default.css'

import React, { useEffect, useRef, useState } from 'react'
import { SHAPES_NODES, SHAPES_NODES_INVERSE } from './Nodes/constants'
import { useDispatch, useSelector } from 'react-redux'

import Fin from './Nodes/Fin'
import Gateway from './Nodes/Gateway'
import { Graph } from 'jointjs/src/dia/Graph'
import Inicio from './Nodes/Inicio'
import { Link } from 'jointjs/src/dia/Link'
import Pantalla from './Nodes/Pantalla'
import { Paper } from 'jointjs/src/dia/Paper'
import Servicio from './Nodes/Servicio'
import { changeForm } from '../_actions'
import sendServer from '../_helpers/sendServer'

export default ({ idDiagram }) => {
  const [graph, setGraph] = useState(null)
  const playground = useRef(null)
  const dispatch = useDispatch()
  const nuevoNodo = useSelector((store) => store.NodeReducer)

  useEffect(() => {
    const response = idDiagram
      ? sendServer('getDiagram', { id: idDiagram })
      : sendServer('createDiagram', {})

    const graphAux = new Graph()
    setGraph(graphAux)

    const paperAux = new Paper({
      el: playground.current,
      width: '100%',
      height: 500,
      model: graphAux,
      gridSize: 10,
      drawGrid: true,
      defaultLink: (cellView, magnet) => {
        const link = new Link({
          attrs: {
            '.connection': { strokeWidth: 2 },
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' },
          },
        })

        sendServer('createLink', {
          diagramId: response.id,
          linkId: link.id,
          sourceId: cellView.id,
          targetId: cellView.id,
        })
        return link
      },
      validateConnection: (
        cellViewS,
        magnetS,
        cellViewT,
        magnetT,
        end,
        linkView,
      ) => {
        if (end === 'source') {
          if (magnetS) {
            const links = graphAux.getConnectedLinks(cellViewS.model, {
              outbound: true,
            })
            return cellViewS.model.attributes.type !== SHAPES_NODES.GATEWAY
              ? links < 1
              : true
          }
        } else {
          if (!magnetT && cellViewT.model.attributes.type !== 'link') {
            return true
          }
        }
        return false
      },
      validateMagnet: (cellView, magnet) => {
        const links = graphAux.getConnectedLinks(cellView.model, {
          outbound: true,
        })
        return cellView.model.attributes.type !== SHAPES_NODES.GATEWAY
          ? links < 1
          : true
      },
    })

    if (idDiagram) {
      let nodos = {}
      response.nodos.forEach((nodo) => {
        let nodoAux = null
        switch (nodo.nodeType) {
          case 'INICIO':
            nodoAux = Inicio(nodo)
            nodos = { ...nodos, [nodo.id]: nodoAux }
            nodoAux.addTo(graphAux)
            break
          case 'FIN':
            nodoAux = Fin(nodo)
            nodos = { ...nodos, [nodo.id]: nodoAux }
            nodoAux.addTo(graphAux)
            break
          case 'GATEWAY':
            nodoAux = Gateway(nodo)
            nodos = { ...nodos, [nodo.id]: nodoAux }
            nodoAux.addTo(graphAux)
            break
          case 'PANTALLA':
            nodoAux = Pantalla(nodo)
            nodos = { ...nodos, [nodo.id]: nodoAux }
            nodoAux.addTo(graphAux)
            break
          case 'SERVICIO':
            nodoAux = Servicio(nodo)
            nodos = { ...nodos, [nodo.id]: nodoAux }
            nodoAux.addTo(graphAux)
            break
          default:
        }
      })
      response.links.forEach((link) => {
        const customLink = new Link({
          source: {
            id: link.sourceId,
            port: nodos[link.sourceId].getPorts()[0].id,
          },
          target: { id: link.targetId },
          attrs: {
            '.connection': { strokeWidth: 2 },
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' },
          },
        })
        link.vertex &&
          link.vertex.forEach((vertice, index) => {
            customLink.insertVertex(index, vertice)
          })
        customLink.addTo(graphAux)
      })
    }

    paperAux.on('element:pointerclick', (element) => {
      dispatch(changeForm(element.model, response.id))
    })
    paperAux.on('blank:pointerclick', (evt, x, y) => dispatch(changeForm()))

    let selectedElement
    paperAux.on('element:pointerdown', (cellView, evt, x, y) => {
      selectedElement = cellView.model.attributes.position
    })

    paperAux.on('element:pointerup', (cellView, evt, x, y) => {
      if (cellView.model.attributes.position !== selectedElement) {
        sendServer('changeNodePosition', {
          diagramId: response.id,
          nodeId: cellView.model.id,
          position: cellView.model.attributes.position,
        })
      }

      selectedElement = null
    })

    paperAux.on(
      'link:connect',
      (linkView, evt, elementViewConnect, magnet, arrowhead) => {
        sendServer('changeLinkSourceTarget', {
          diagramId: response.id,
          linkId: linkView.model.id,
          sourceId: linkView.model.attributes.source.id,
          targetId: linkView.model.attributes.target.id,
        })
      },
    )

    graphAux.on('change:vertices', (linkView, vertices) => {
      sendServer('changeVertex', {
        diagramId: response.id,
        nodeId: linkView.id,
        vertex: vertices,
      })
    })

    graphAux.on('add', function (cell, collection, opt) {
      !cell.isLink() &&
        sendServer('createNode', {
          diagramId: response.id,
          nodeId: cell.id,
          position: cell.attributes.position,
          size: cell.attributes.size,
          type:
            SHAPES_NODES_INVERSE[cell.attributes.type] === 'INICIO' &&
            cell.attr('text/text') === 'Fin'
              ? 'FIN'
              : SHAPES_NODES_INVERSE[cell.attributes.type],
          texto: cell.attr('text/text'),
        })
    })

    graphAux.on('remove', function (cell, collection, opt) {
      cell.isLink()
        ? sendServer('deleteLink', {
            diagramId: response.id,
            linkId: cell.id,
          })
        : sendServer('deleteNode', { diagramId: response.id, nodeId: cell.id })
    })

    if (!idDiagram) {
      Inicio().addTo(graphAux)
      Fin().addTo(graphAux)
    }
  }, [dispatch, idDiagram])

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
