import { combineReducers } from 'redux'
import params from './updateParams'
import tiles from './updateTiles'
import list from './updateList'

const appReducer = combineReducers({
  params,
  tiles,
  list
});

const initialState = appReducer({}, {}, {});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = initialState
  }

  return appReducer(state, action)
}

export default rootReducer;