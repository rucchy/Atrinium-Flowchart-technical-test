import Out from '../Ports/Out'
import { Polygon } from 'jointjs/src/shapes/standard'

export default (nodo) => {
  const servicio = new Polygon({
    id: nodo ? nodo.id : null,
    position: nodo ? nodo.position : { x: 200, y: 180 },
    size: nodo ? nodo.size : { width: 80, height: 80 },
    ports: {
      groups: Out(),
    },
  })

  servicio.addPort({ group: 'out' })
  servicio.attr({
    text: {
      text: nodo ? nodo.texto : 'Servicio',
    },
  })
  servicio.attr(
    'body/refPoints',
    '0.25 0.05, 0.75 0.05, 1 0.5, 0.75 0.95, 0.25 0.95, 0 0.5',
  )

  return servicio
}
