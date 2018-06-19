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

function addCol(col, option) {
  console.log(col);
  return {
    type: actionTypes.ADD_COL,
    payload: {
      col: col,
      colOption: option,
    }
  }
}

function removeRow(index) {
  return {
    type: actionTypes.REMOVE_ROW,
    payload: index
  }
}

function removeCol(index) {
  return {
    type: actionTypes.REMOVE_COL,
    payload: index
  }
}

export default {
  addRow,
  addCol,
  removeRow,
  removeCol,
};
