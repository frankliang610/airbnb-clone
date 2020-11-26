import { combineReducers } from 'redux';
import authReducer from './authReducer';
import siteModalReducer from './siteModalReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  siteModal: siteModalReducer,
});

export default rootReducer;
