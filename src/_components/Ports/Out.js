export default () => {
  return {
    out: {
      position: {
        name: 'ellipse',
        args: {
          startAngle: 180,
        },
      },
      attrs: {
        circle: {
          fill: '#ffffff',
          stroke: '#31d0c6',
          'stroke-width': 2,
          r: 10,
          magnet: true,
        },
      },
      z: 0,
    },
  }
}
