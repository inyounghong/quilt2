import Square from '../components/Square.jsx';
import squaresActions from '../redux/actions/squares';
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
  // selectedFabric: state.selectedFabric
});

const mapDispatchToProps = (dispatch) => ({
  // // Stories
  updateSquare(square) {
    dispatch(squaresActions.updateSquare(square));
  },
  rotateSquare(squareId, rotation) {
    dispatch(squaresActions.rotateSquare(squareId, rotation));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  (Square)
);
