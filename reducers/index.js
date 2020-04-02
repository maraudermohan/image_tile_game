import { combineReducers } from 'redux';
import gameParams from './params';


const appReducer = combineReducers(gameParams);

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
