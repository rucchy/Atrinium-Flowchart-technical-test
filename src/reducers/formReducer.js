const initialState = {
  node: null,
  diagramId: null,
}

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_FORM': {
      return { ...state, node: action.node, diagramId: action.diagramId }
    }
    default: {
      return state
    }
  }
}

export default formReducer
