import uuid from 'uuid';
import * as actionTypes from '../../constants/actionTypes';
import { isV4 } from '../../helpers';


function createSquare() {
  return {
    type: actionTypes.CREATE_SQUARE,
    payload: {
      id: uuid.v4(),
      type: "SQUARE",
      fabrics: [0],
      rotation: 0
    },
  };
}

function updateSquare(updatedSquare) {
  return {
    type: actionTypes.UPDATE_SQUARE,
    payload: updatedSquare,
  };
}

function rotateSquare(squareId, rotation) {
  return {
    type: actionTypes.ROTATE_SQUARE,
    payload: {
      id: squareId,
      rotation: rotation,
    }
  }
}


export default {
  createSquare,
  updateSquare,
  rotateSquare,
};
