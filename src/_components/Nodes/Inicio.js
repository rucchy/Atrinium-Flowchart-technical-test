import { Circle } from 'jointjs/src/shapes/basic'
import Out from '../Ports/Out'

export default (nodo) => {
  const inicio = new Circle({
    id: nodo ? nodo.id : null,
    position: nodo ? nodo.position : { x: 100, y: 30 },
    size: nodo ? nodo.size : { width: 60, height: 60 },
    ports: {
      groups: Out(),
    },
  })

  inicio.addPort({ group: 'out' })
  inicio.attr({
    circle: {
      fill: '#F8CECC',
    },
    text: {
      text: nodo ? nodo.texto : 'Inicio',
      fill: 'black',
    },
  })

  return inicio
}
