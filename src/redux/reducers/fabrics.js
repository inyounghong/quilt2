import * as actionTypes from '../../constants/actionTypes';
import uuid from 'uuid';
import update from 'react-addons-update';

const defaultState = [
  {
    id: 0,
    color: "7bdcb5",
  },
  {
    id: 1,
    color: "fcb900",
  },
  {
    id: 2,
    color: "blue",
  }

];

export default function fabrics(state = defaultState, action) {

    switch (action.type) {
      case actionTypes.ADD_FABRIC:
        return state.concat(action.payload);

      case actionTypes.UPDATE_FABRIC:
        let newState = state.slice();
        newState[action.payload.id] = action.payload;
        return newState;

      case actionTypes.UPDATE_COLOR_PALETTE:
        const palette = action.payload;
        return palette.map((color,i) => {
          return {
            id: i,
            color: color
          }
        });
        // case actionTypes.CREATE_TASK:
        //     return state.concat(action.payload);
        //
        // case actionTypes.UPDATE_TASK:
        //     return state.map(task => {
        //         if(task.id === action.payload.id) {
        //             return Object.assign({}, task, action.payload);
        //         }
        //         return task;
        //     });
        //
        // case actionTypes.DELETE_TASK:
        //     const newState = state.filter(task => task.id !== action.payload.id);
        //     console.log(newState);
        //     return newState;

        default:
            return state;
    }
}
