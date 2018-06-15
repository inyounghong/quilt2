import uuid from 'uuid';
import * as actionTypes from '../../constants/actionTypes';
import * as squareTypes from '../../constants/squareTypes';
import { isV4 } from '../../helpers';


function createSquare() {
  return {
    type: actionTypes.CREATE_SQUARE,
    payload: {
      id: uuid.v4(),
      type: "SQUARE",
      fabricIds: squareTypes.DEFAULT_FABRICS,
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
