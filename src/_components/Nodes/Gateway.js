import Out from '../Ports/Out'
import { Rhombus } from 'jointjs/src/shapes/basic'

export default (nodo) => {
  const gateway = new Rhombus({
    id: nodo ? nodo.id : null,
    position: nodo ? nodo.position : { x: 300, y: 180 },
    size: nodo ? nodo.size : { width: 80, height: 80 },
    ports: {
      groups: Out(),
    },
  })

  gateway.addPort({ group: 'out' })
  gateway.attr({
    path: {
      fill: '#FFCE9F',
    },
    text: {
      text: nodo ? nodo.texto : 'Gateway',
      fill: 'black',
    },
  })

  return gateway
}
