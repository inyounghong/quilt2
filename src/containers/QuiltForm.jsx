import QuiltForm from '../components/QuiltForm.jsx';
import appActions from '../redux/actions/app';
import quiltActions from '../redux/actions/quilt';
import squaresActions from '../redux/actions/squares';
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
    // isColumnView: state.app.isColumnView,
});

const mapDispatchToProps = (dispatch) => ({

  addSquare(rotation, colors) {
    const newSquare = squaresActions.addSquare(rotation, colors);
    dispatch(newSquare);
    return newSquare;
  },
  clearQuilt() {
    dispatch(quiltActions.clearQuilt());
    dispatch(squaresActions.clearSquares());
  },
  setBlockSize(blockSize) {
    // console.log("setting block size", blockSize);
    dispatch(appActions.setBlockSize(blockSize));
  },
  addRowToQuilt(row, option) {
    dispatch(quiltActions.addRow(row, option));
  },
  removeRowFromQuilt(index) {
    dispatch(quiltActions.removeRow(index));
  },
  addColToQuilt(col, option) {
    dispatch(quiltActions.addCol(col, option));
  },
  removeColFromQuilt(index) {
    dispatch(quiltActions.removeCol(index));
  },

});
export default connect(mapStateToProps, mapDispatchToProps)(
    (QuiltForm)
);
