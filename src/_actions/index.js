export const addNode = (type) => ({
  type: 'ADD_NODE',
  nodeType: type,
})

export const changeForm = (node) => ({
  type: 'CHANGE_FORM',
  node: node,
})
