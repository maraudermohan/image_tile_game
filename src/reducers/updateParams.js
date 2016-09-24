export default function updateParams(state = [], action) {
  switch (action.type) {
	case 'UPDATE_ROW_COL':
		return Object.assign({},state,{rowLength : action.rowLength},{colLength : action.colLength},{tileWidth : action.tileWidth},{tileHeight : action.tileHeight},{width : action.width},{height : action.height},{shuffleCounter : action.shuffleCounter},{isGameReady : action.isGameReady});

	case 'DECREMENT_COUNTER':
		return Object.assign({},state,{shuffleCounter : action.counter})

	case 'TOGGLE_GAME_READY':
		return Object.assign({},state,{isGameReady : true})

    default:
      return state;
  }
}
