import uuid from 'uuid';
import * as actionTypes from '../../constants/actionTypes';
import { isV4 } from '../../helpers';


function addFabric(color) {
  return {
    type: actionTypes.ADD_FABRIC,
    payload: {
      id: uuid.v4(),
      color: color,
    }
  };
}

function updateFabric(updatedFabric) {
  return {
    type: actionTypes.UPDATE_FABRIC,
    payload: updatedFabric,
  };
}



export default {
  addFabric,
  updateFabric,
};
