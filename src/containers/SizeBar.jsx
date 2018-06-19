import SizeBar from '../components/SizeBar.jsx';
import appActions from '../redux/actions/app';
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
    // isColumnView: state.app.isColumnView,
});

const mapDispatchToProps = (dispatch) => ({
  // updateRows(rows) {
  //   dispatch(appActions.updateRows(rows))
  // }

  // // Stories
  // updateQuilt(story) {
  //     dispatch(storyActions.updateQuilt(story));
  // },

});
export default connect(mapStateToProps, mapDispatchToProps)(
    (SizeBar)
);
