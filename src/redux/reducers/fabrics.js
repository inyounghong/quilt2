import * as actionTypes from '../../constants/actionTypes';
import itemTypes from '../../constants/itemTypes';
import uuid from 'uuid';
import update from 'react-addons-update';

const defaultState = [
  {
    id: "36fe06e8-ecc1-4218-ace2-d441da577f8a",
    color: "red",
  },
  {
    id: "96ca2518-b3aa-4761-8a80-d98d2441488a",
    color: "green",
  },
  {
    id: "5dbf5ca8-dfe6-43f8-a359-484735754445",
    color: "blue",
  }

];

export default function fabrics(state = defaultState, action) {

    switch (action.type) {
      case actionTypes.ADD_FABRIC:
        return state.concat(action.payload);
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
