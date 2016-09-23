import { combineReducers } from 'redux'
import params from './updateParams'
import tiles from './updateTiles'
import list from './updateList'

const rootReducer = combineReducers({
  params,
  tiles,
  list
});

export default rootReducer;