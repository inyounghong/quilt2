import Quilt from '../components/Quilt.jsx';
import appActions from '../redux/actions/app';
import quiltActions from '../redux/actions/quilt';
import squaresActions from '../redux/actions/squares';
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
    // isColumnView: state.app.isColumnView,
});

const mapDispatchToProps = (dispatch) => ({



});
export default connect(mapStateToProps, mapDispatchToProps)(
    (Quilt)
);
