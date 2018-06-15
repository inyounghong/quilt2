import FabricBar from '../components/FabricBar.jsx';
import fabricActions from '../redux/actions/fabric';
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
  // selectedFabric: state.selectedFabric
});

const mapDispatchToProps = (dispatch) => ({
  addFabric(color) {
    dispatch(fabricActions.addFabric(color));
  }
  // updateFabrics(square) {
  //   dispatch(squaresActions.updateFabrics(square));
  // },
  // rotateFabrics(squareId, rotation) {
  //   dispatch(squaresActions.rotateFabrics(squareId, rotation));
  // }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  (FabricBar)
);
