import Out from '../Ports/Out'
import { Rhombus } from 'jointjs/src/shapes/basic'

export default () => {
  const gateway = new Rhombus({
    position: { x: 300, y: 180 },
    size: { width: 80, height: 80 },
    ports: {
      groups: Out(),
    },
  })

  gateway.addPort({ group: 'out' })
  gateway.attr({
    path: {
      fill: '#FFCE9F',
    },
    text: {
      text: 'Gateway',
      fill: 'black',
    },
  })

  return gateway
}
