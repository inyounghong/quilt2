import Square from '../components/Square.jsx';
import squaresActions from '../redux/actions/squares';
import * as itemTypes from '../constants/itemTypes';
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
  // selectedFabric: state.selectedFabric
});

const mapDispatchToProps = (dispatch) => ({
  // // Stories
  updateSquare(square) {
      dispatch(squaresActions.updateSquare(square));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  (Square)
);