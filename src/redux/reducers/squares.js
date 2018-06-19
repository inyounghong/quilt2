import * as actionTypes from '../../constants/actionTypes';
import * as squareTypes from '../../constants/squareTypes';
import uuid from 'uuid';
import update from 'react-addons-update';

// const defaultState = [
//   {id: "36fe06e8-ecc1-4218-ace2-d441da577f8a", type: "SQUARE", fabricIds: squareTypes.DEFAULT_FABRICS, rotation: 0 },
//   {id: "96ca2518-b3aa-4761-8a80-d98d2441488a", type: "SQUARE", fabricIds: squareTypes.DEFAULT_FABRICS, rotation: 0 },
//   {id: "5dbf5ca8-dfe6-43f8-a359-484735754445", type: "SQUARE", fabricIds: squareTypes.DEFAULT_FABRICS, rotation: 0 },
//
//   {id: "cbadbda8-576e-471f-a692-4922a1d66e2f", type: "SQUARE", fabricIds: squareTypes.DEFAULT_FABRICS, rotation: 0 },
//   {id: "d8c5dad7-72c4-437a-8322-4527c1b6207a", type: "SQUARE", fabricIds: squareTypes.DEFAULT_FABRICS, rotation: 0 },
//   {id: "6e7a5641-3e87-40a6-9c9a-a125a71f1727", type: "SQUARE", fabricIds: squareTypes.DEFAULT_FABRICS, rotation: 0 },
//
//   {id: "64cf8de1-afe9-4cb4-855f-d58250e4af0b", type: "SQUARE", fabricIds: squareTypes.DEFAULT_FABRICS, rotation: 0},
//   {id: "a81c97a4-a550-44d8-afa6-ce380092f1f9", type: "SQUARE", fabricIds: squareTypes.DEFAULT_FABRICS, rotation: 0},
//   {id: "f72a69c5-a1f7-4661-a946-6b0700be78bc", type: "SQUARE", fabricIds: squareTypes.DEFAULT_FABRICS, rotation: 0},
//
//   {id: "9c25f714-01be-42d7-a05d-53a08c0137ac", type: "SQUARE", fabricIds: squareTypes.DEFAULT_FABRICS, rotation: 0},
//   {id: "100ed047-4493-4323-b4b4-0670c43ccff3", type: "SQUARE", fabricIds: squareTypes.DEFAULT_FABRICS, rotation: 0},
//   {id: "1a2ea2a0-1796-4423-92af-085061346a2a", type: "SQUARE", fabricIds: squareTypes.DEFAULT_FABRICS, rotation: 0},
//
//   {id: "9c994005-5a51-4695-b4ae-05f6a0b59c06", type: "SQUARE", fabricIds: squareTypes.DEFAULT_FABRICS, rotation: 0},
//   {id: "fcbf2601-3912-4aa5-a3cb-02f19c77a10b", type: "SQUARE", fabricIds: squareTypes.DEFAULT_FABRICS, rotation: 0},
//   {id: "f786229d-2eca-4e23-a654-edf1146eb22b", type: "SQUARE", fabricIds: squareTypes.DEFAULT_FABRICS, rotation: 0},
// ];
const defaultState = [];

export default function squares(state = defaultState, action) {

    switch (action.type) {
      case actionTypes.CREATE_SQUARE:
        return state.concat(action.payload);

      case actionTypes.UPDATE_SQUARE:
        return state.map(square => {
          if(square.id === action.payload.id) {
            return Object.assign({}, square, action.payload);
          }
          return square;
        });

      case actionTypes.ROTATE_SQUARE:
        return state.map(square => { // Look through all squares to find one to change
          if(square.id === action.payload.id) {
            const newSquare = square;
            newSquare.rotation = action.payload.rotation;
            return Object.assign({}, square, newSquare);
          }
          return square;
        });


      default:
        return state;
    }
}
