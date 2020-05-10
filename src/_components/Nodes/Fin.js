import { Circle } from 'jointjs/src/shapes/basic'

export default (nodo) => {
  const fin = new Circle({
    id: nodo ? nodo.id : null,
    position: nodo ? nodo.position : { x: 100, y: 120 },
    size: nodo ? nodo.size : { width: 60, height: 60 },
  })

  fin.attr({
    circle: {
      fill: '#F8CECC',
    },
    text: {
      text: nodo ? nodo.texto : 'Fin',
      fill: 'black',
    },
  })

  return fin
}
