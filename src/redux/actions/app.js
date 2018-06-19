import uuid from 'uuid';
import * as actionTypes from '../../constants/actionTypes';

function updateRows(rows) {
  return {
    type: actionTypes.UPDATE_ROWS,
    payload: rows,
  };
}


export default {
    updateRows,
};
