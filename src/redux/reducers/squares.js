import * as actionTypes from '../../constants/actionTypes';
import itemTypes from '../../constants/itemTypes';
import uuid from 'uuid';
import update from 'react-addons-update';

const DEFAULT_SQUARE = {id: uuid.v4(), type: "SQUARE", fabrics: [0], rotation: 0};

const defaultState = [
  {id: "36fe06e8-ecc1-4218-ace2-d441da577f8a", type: "SQUARE", fabrics: [0,1], rotation: 0 },
  {id: "96ca2518-b3aa-4761-8a80-d98d2441488a", type: "SQUARE", fabrics: [0,1], rotation: 0 },
  {id: "5dbf5ca8-dfe6-43f8-a359-484735754445", type: "SQUARE", fabrics: [0,1], rotation: 0 },

  {id: "cbadbda8-576e-471f-a692-4922a1d66e2f", type: "SQUARE", fabrics: [0,1], rotation: 0 },
  {id: "d8c5dad7-72c4-437a-8322-4527c1b6207a", type: "SQUARE", fabrics: [0,1], rotation: 0 },
  {id: "6e7a5641-3e87-40a6-9c9a-a125a71f1727", type: "SQUARE", fabrics: [0,1], rotation: 0 },
];

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
