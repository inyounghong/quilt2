import uuid from 'uuid';
import * as actionTypes from '../../constants/actionTypes';
import { isV4 } from '../../helpers';


function addPalette(color) {
  return {
    type: actionTypes.ADD_PALETTE,
    payload: {
      id: uuid.v4(),
      color: color,
    }
  };
}

function updatePalette(updatedPalette) {
  return {
    type: actionTypes.UPDATE_PALETTE,
    payload: updatedPalette,
  };
}

function updateColorPalette(palette) {
  return {
    type: actionTypes.UPDATE_COLOR_PALETTE,
    payload: palette,
  };
}



export default {
  addPalette,
  updatePalette,
  updateColorPalette
};
