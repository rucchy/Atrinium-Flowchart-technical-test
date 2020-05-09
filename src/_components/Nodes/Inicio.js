import { Circle } from 'jointjs/src/shapes/basic'
import Out from '../Ports/Out'

export default () => {
  const inicio = new Circle({
    position: { x: 100, y: 30 },
    size: { width: 60, height: 60 },
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
      text: 'Inicio',
      fill: 'black',
    },
  })

  return inicio
}
