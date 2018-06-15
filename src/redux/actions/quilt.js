import * as actionTypes from '../../constants/actionTypes';

function addRow(row, option) {
  return {
    type: actionTypes.ADD_ROW,
    payload: {
      row: row,
      option: option,
    }
  }
}

export default {
  addRow,
};
