import Out from '../Ports/Out'
import { Rect } from 'jointjs/src/shapes/basic'

export default () => {
  const pantalla = new Rect({
    position: { x: 400, y: 180 },
    size: { width: 80, height: 80 },
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
      text: 'Pantalla',
      fill: 'black',
    },
  })

  return pantalla
}
