import {
  applyMiddleware,
  combineReducers,
  createStore,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import user from './reducers/user';
import videos from './reducers/video';

const rootReducer = combineReducers({
  user,
  videos,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
