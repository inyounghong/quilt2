import * as actionTypes from '../../constants/actionTypes';
import itemTypes from '../../constants/itemTypes';
import uuid from 'uuid';
import update from 'react-addons-update';

const defaultState = [
  {
    id: 0,
    color: "red",
  },
  {
    id: 1,
    color: "blue",
  },
  {
    id: 2,
    color: "green",
  }
];

export default function fabrics(state = defaultState, action) {

    switch (action.type) {
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
