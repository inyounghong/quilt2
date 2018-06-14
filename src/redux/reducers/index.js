import { combineReducers } from 'redux';
import storiesReducer from './stories';
import tagsReducer from './tags';
import tasksReducer from './tasks';
import appReducer from './app';
import quiltReducer from './quilt';
import fabricsReducer from './fabrics';
import squaresReducer from './squares';

export default combineReducers({
  stories: storiesReducer,
  tags: tagsReducer,
  tasks: tasksReducer,
  app: appReducer,
  quilt: quiltReducer,
  fabric: fabricsReducer,
  squares: squaresReducer,
});
