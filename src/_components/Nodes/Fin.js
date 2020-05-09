import { Circle } from 'jointjs/src/shapes/basic'

export default () => {
  const fin = new Circle({
    position: { x: 100, y: 120 },
    size: { width: 60, height: 60 },
  })

  fin.attr({
    circle: {
      fill: '#F8CECC',
    },
    text: {
      text: 'Fin',
      fill: 'black',
    },
  })

  return fin
}
