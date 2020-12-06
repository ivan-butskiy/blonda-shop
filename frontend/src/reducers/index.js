import { combineReducers } from 'redux';
import authReducer from './auth';
import basketReducer from './basket';
import favoriteReducer from './favorite';

export default combineReducers({
    authReducer, basketReducer, favoriteReducer
});