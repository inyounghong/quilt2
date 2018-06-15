import * as actionTypes from '../../constants/actionTypes';
import uuid from 'uuid';
import update from 'react-addons-update';

const defaultState = [
  ["36fe06e8-ecc1-4218-ace2-d441da577f8a", "96ca2518-b3aa-4761-8a80-d98d2441488a", "5dbf5ca8-dfe6-43f8-a359-484735754445"],
  ["cbadbda8-576e-471f-a692-4922a1d66e2f", "d8c5dad7-72c4-437a-8322-4527c1b6207a", "6e7a5641-3e87-40a6-9c9a-a125a71f1727"],
  ["64cf8de1-afe9-4cb4-855f-d58250e4af0b", "a81c97a4-a550-44d8-afa6-ce380092f1f9", "f72a69c5-a1f7-4661-a946-6b0700be78bc"],
  ["36fe06e8-ecc1-4218-ace2-d441da577f8a", "96ca2518-b3aa-4761-8a80-d98d2441488a", "5dbf5ca8-dfe6-43f8-a359-484735754445"],
  ["cbadbda8-576e-471f-a692-4922a1d66e2f", "d8c5dad7-72c4-437a-8322-4527c1b6207a", "6e7a5641-3e87-40a6-9c9a-a125a71f1727"]
];

export default function quilt(state = defaultState, action) {

    switch (action.type) {
      case actionTypes.ADD_ROW:
        const {row, option} = action.payload;
        if (option == 0) { // Add row before
          return [
            row,
            ...state.slice()
          ];
        }
        return state.concat([row]); // Add row after

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
