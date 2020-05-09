import { Circle } from 'jointjs/src/shapes/basic'

export default () => {
  const inicio = new Circle()

  inicio.position(100, 30)
  inicio.resize(50, 50)
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
