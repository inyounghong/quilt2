import * as actionTypes from '../../constants/actionTypes';
import * as squareTypes from '../../constants/squareTypes';

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
  return {
    type: actionTypes.ADD_COL,
    payload: {
      col: col,
      colOption: option,
    }
  }
}

function changePattern(pattern) {
  return {
    type: actionTypes.FLYING_GEESE,
    payload: pattern,
  }
}

function clearQuilt() {
  return {
    type: actionTypes.CLEAR_QUILT,
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
  changePattern,
  clearQuilt,
  removeRow,
  removeCol,
};
