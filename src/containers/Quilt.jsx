import Quilt from '../components/Quilt.jsx';
import quiltActions from '../redux/actions/quilt';
import squaresActions from '../redux/actions/squares';
import * as itemTypes from '../constants/itemTypes';
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
    // isColumnView: state.app.isColumnView,
});

const mapDispatchToProps = (dispatch) => ({


  // // Stories
  // updateQuilt(story) {
  //     dispatch(storyActions.updateQuilt(story));
  // },

});
export default connect(mapStateToProps, mapDispatchToProps)(
    (Quilt)
);
