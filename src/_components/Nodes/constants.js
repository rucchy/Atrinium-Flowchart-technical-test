export const SHAPES_NODES = {
  FIN: 'basic.Circle',
  INICIO: 'basic.Circle',
  PANTALLA: 'basic.Rect',
  SERVICIO: 'standard.Polygon',
  GATEWAY: 'basic.Rhombus',
}

export const SHAPES_NODES_INVERSE = {
  'basic.Circle': 'INICIO',
  'basic.Rect': 'PANTALLA',
  'standard.Polygon': 'SERVICIO',
  'basic.Rhombus': 'GATEWAY',
}

export const SHAPES_DEFAULT_SIZE = {
  'basic.Circle': 60,
  'basic.Rhombus': 80,
  'basic.Rect': 80,
  'standard.Polygon': 80,
}
