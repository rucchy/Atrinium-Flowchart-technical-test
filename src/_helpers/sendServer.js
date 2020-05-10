const ejemplo = {
  nodos: [
    {
      id: '1',
      nodeType: 'INICIO',
      position: { x: 460, y: 40 },
      size: { width: 100, height: 60 },
      texto: 'Inicio ejemplo',
    },
    {
      id: '2',
      nodeType: 'FIN',
      position: { x: 460, y: 410 },
      size: { width: 80, height: 70 },
      texto: 'Fin ejemplo',
    },
    {
      id: '3',
      nodeType: 'GATEWAY',
      position: { x: 410, y: 130 },
      size: { width: 200, height: 80 },
      texto: 'Gateway ejemplo',
    },
    {
      id: '4',
      nodeType: 'SERVICIO',
      position: { x: 200, y: 180 },
      size: { width: 120, height: 100 },
      texto: 'Servicio ejemplo',
      caracteristicasSERVICIO: 'ejemplo de caracteristicas servicio',
    },
    {
      id: '5',
      nodeType: 'PANTALLA',
      position: { x: 660, y: 290 },
      size: { width: 115, height: 100 },
      texto: 'Pantalla ejemplo',
      caracteristicasPANTALLA: 'ejemplo de caracteristicas pantalla',
    },
  ],
  links: [
    {
      id: '6',
      sourceId: '1',
      targetId: '3',
    },
    {
      id: '7',
      sourceId: '3',
      targetId: '4',
    },
    {
      id: '8',
      sourceId: '3',
      targetId: '5',
      vertex: [{ x: 720, y: 210 }],
    },
    {
      id: '9',
      sourceId: '5',
      targetId: '2',
    },
    {
      id: '10',
      sourceId: '4',
      targetId: '2',
      vertex: [{ x: 260, y: 440 }],
    },
  ],
}

const sendServer = (func, params) => {
  console.log('ENVÍO DATOS AL SERVIDOR: ' + func + ' -> ', params)
  let response = { status: 'OK' }
  switch (func) {
    case 'createDiagram':
      response = { ...response, id: Math.round(Math.random() * 1000) }
      break
    case 'getDiagram':
      response = {
        ...response,
        id: params.id,
        nodos: ejemplo.nodos,
        links: ejemplo.links,
      }
      break
    case 'getNodo':
      response = { ...response, nodeId: params.nodeId }
      if (['PANTALLA', 'SERVICIO'].includes(params.nodeType)) {
        const cadena = 'caracteristicas' + params.nodeType
        response = { ...response, [cadena]: 'texto ' + params.nodeType }
      }
      break
    default:
  }
  console.log('RECEPCIÓN DATOS DEL SERVIDOR: ' + func + ' -> ', response)
  return response
}

export default sendServer
