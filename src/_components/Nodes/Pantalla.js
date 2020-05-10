import Out from '../Ports/Out'
import { Rect } from 'jointjs/src/shapes/basic'

export default (nodo) => {
  const pantalla = new Rect({
    id: nodo ? nodo.id : null,
    position: nodo ? nodo.position : { x: 400, y: 180 },
    size: nodo ? nodo.size : { width: 80, height: 80 },
    ports: {
      groups: Out(),
    },
  })

  pantalla.addPort({ group: 'out' })
  pantalla.attr({
    rect: {
      fill: '#FFE599',
    },
    text: {
      text: nodo ? nodo.texto : 'Pantalla',
      fill: 'black',
    },
  })

  return pantalla
}
