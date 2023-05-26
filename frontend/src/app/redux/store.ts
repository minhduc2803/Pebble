import {
  applyMiddleware,
  combineReducers,
  createStore,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import user from './reducers/user';

const rootReducer = combineReducers({
  user,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
