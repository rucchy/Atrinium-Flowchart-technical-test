import { Rhombus } from 'jointjs/src/shapes/basic'

export default () => {
  const gateway = new Rhombus()

  gateway.position(300, 180)
  gateway.resize(80, 80)
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
