import { Polygon } from 'jointjs/src/shapes/standard'

export default () => {
  const servicio = new Polygon()

  servicio.position(200, 180)
  servicio.resize(80, 80)
  servicio.attr({
    text: {
      text: 'Servicio',
    },
  })
  servicio.attr(
    'body/refPoints',
    '0.25 0.05, 0.75 0.05, 1 0.5, 0.75 0.95, 0.25 0.95, 0 0.5',
  )

  return servicio
}
