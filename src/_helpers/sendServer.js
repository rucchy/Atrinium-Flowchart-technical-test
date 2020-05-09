const sendServer = (func, params) => {
  console.log('ENVÍO DATOS AL SERVIDOR: ' + func + ' -> ', params)
  let response = { status: 'OK' }
  switch (func) {
    case 'createDiagram':
      response = { ...response, id: Math.round(Math.random() * 1000) }
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
