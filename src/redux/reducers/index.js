import { combineReducers } from 'redux';
import appReducer from './app';
import quiltReducer from './quilt';
import fabricsReducer from './fabrics';
import squaresReducer from './squares';

export default combineReducers({
  app: appReducer,
  quilt: quiltReducer,
  fabric: fabricsReducer,
  squares: squaresReducer,
});
