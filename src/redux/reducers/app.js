import * as actionTypes from '../../constants/actionTypes';

const defaultState = {
    rows: 3,
    cols: 3,
    blockSize: 10,
}

export default function app(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.SET_ROWS:
      return Object.assign({}, state, {
          rows: action.payload,
      });

    case actionTypes.SET_BLOCK_SIZE:
      return Object.assign({}, state, {
        blockSize: action.payload,
      });

    default:
      return state;
  }
}
