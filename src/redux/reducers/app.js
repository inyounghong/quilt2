import * as actionTypes from '../../constants/actionTypes';

const defaultState = {
    rows: 3,
    cols: 3,
}

export default function app(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.UPDATE_ROWS:
          return Object.assign({}, state, {
              rows: action.payload,
          });

        default:
          return state;
    }
}
