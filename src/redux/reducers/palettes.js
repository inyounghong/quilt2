import * as actionTypes from '../../constants/actionTypes';
import uuid from 'uuid';
import update from 'react-addons-update';

const defaultState = [
  {
    id: 0,
    palette: ['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58'],
  },
  {
    id: 1,
    palette: ['#490A3D', '#BD1550', '#E97F02', '#F8CA00', '#8A9B0F'],
  }
];

export default function palettes(state = defaultState, action) {

    switch (action.type) {
      // case actionTypes.ADD_FABRIC:
      //   return state.concat(action.payload);
      //
      // case actionTypes.UPDATE_FABRIC:
      //   let newState = state.slice();
      //   newState[action.payload.id] = action.payload;
      //   return newState;
      //
      // case actionTypes.UPDATE_COLOR_PALETTE:
      //   const palette = action.payload;
      //   return palette.map((color,i) => {
      //     return {
      //       id: i,
      //       color: color
      //     }
      //   });

        default:
            return state;
    }
}
