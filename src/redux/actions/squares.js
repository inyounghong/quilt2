import uuid from 'uuid';
import * as actionTypes from '../../constants/actionTypes';
import * as squareTypes from '../../constants/squareTypes';
import { isV4 } from '../../helpers';

function addSquare(rotation) {
  return {
    type: actionTypes.ADD_SQUARE,
    payload: {
      id: uuid.v4(),
      type: "SQUARE",
      fabricIds: squareTypes.DEFAULT_FABRICS,
      rotation: rotation
    },
  }
}

function clearSquares() {
  return {
    type: actionTypes.CLEAR_SQUARES,
  }
}

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
  addSquare,
  clearSquares,
  createSquare,
  updateSquare,
  rotateSquare,
};
