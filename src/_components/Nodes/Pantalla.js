import { Rect } from 'jointjs/src/shapes/basic'

export default () => {
  const pantalla = new Rect()

  pantalla.position(400, 180)
  pantalla.resize(80, 80)
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
