import uuid from 'uuid';
import * as actionTypes from '../../constants/actionTypes';

function setRows(rows) {
  return {
    type: actionTypes.SET_ROWS,
    payload: rows,
  };
}

function setCols(cols) {
  return {
    type: actionTypes.SET_COLS,
    payload: cols,
  };
}

function setBlockSize(blockSize) {
  return {
    type: actionTypes.SET_BLOCK_SIZE,
    payload: blockSize,
  }
}


export default {
    setRows,
    setCols,
    setBlockSize,
};
