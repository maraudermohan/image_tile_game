import { combineReducers } from 'redux'
import params from './updateParams'
import tiles from './updateTiles'

const rootReducer = combineReducers({
  params,
  tiles
});

export default rootReducer;