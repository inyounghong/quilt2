import uuid from 'uuid';
import * as actionTypes from '../../constants/actionTypes';

function updateRows(rows) {
  return {
    type: actionTypes.UPDATE_ROWS,
    payload: rows,
  };
}

function setBlockSize(blockSize) {
  return {
    type: actionTypes.SET_BLOCK_SIZE,
    payload: blockSize,
  }
}


export default {
    updateRows,
    setBlockSize,
};
