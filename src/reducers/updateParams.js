export default function updateParams(state = [], action) {
  switch (action.type) {
	case 'UPDATE_ROW_COL':
		return Object.assign({},state,{rowLength : action.rowLength},{colLength : action.colLength}
  			,{tileWidth : action.tileWidth},{tileHeight : action.tileHeight});

    default:
      return state;
  }
}
