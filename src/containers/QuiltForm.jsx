import QuiltForm from '../components/QuiltForm.jsx';
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
  addRowToQuilt(row, option) {
    dispatch(quiltActions.addRow(row, option));
  },
  clearQuilt() {
    dispatch(quiltActions.clearQuilt());
    dispatch(squaresActions.clearSquares());
  }

});
export default connect(mapStateToProps, mapDispatchToProps)(
    (QuiltForm)
);
