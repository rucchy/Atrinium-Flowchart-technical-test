const initialState = {
  counter: 0,
  nodeType: null,
}

const nodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NODE': {
      return { ...state, counter: state.counter + 1, nodeType: action.nodeType }
    }
    default: {
      return state
    }
  }
}

export default nodeReducer
