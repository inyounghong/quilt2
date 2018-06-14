import * as actionTypes from '../../constants/actionTypes';

function addRowBefore(row) {
  return {
    type: actionTypes.ADD_ROW_BEFORE,
    payload: row,
  };
}

export default {
  addRowBefore,
};
