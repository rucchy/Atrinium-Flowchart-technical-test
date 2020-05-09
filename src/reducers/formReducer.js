const initialState = {
  node: null,
}

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_FORM': {
      return { ...state, node: action.node }
    }
    default: {
      return state
    }
  }
}

export default formReducer
