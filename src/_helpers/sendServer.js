const sendServer = (func, params) => {
  console.log('ENVÍO DATOS AL SERVIDOR: ' + func + ' -> ', params)
  console.log('RECEPCIÓN DATOS DEL SERVIDOR: ' + func + ' -> ', {
    id: 1,
    status: 'OK',
  })
}

export default sendServer
