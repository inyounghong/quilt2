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


export default {
  createSquare,
};
