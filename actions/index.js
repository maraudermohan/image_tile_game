const selectImage = (payload) => ({
  type: 'SELECT_IMAGE',
  payload,
});

const logOut = () => ({
  type: 'LOG_OUT',
});

const createTileLists = (tileCssList, tileOrderList) => ({
  type: 'CREATE_TILE_LISTS',
  tileCssList,
  tileOrderList,
});

const toggleGameReady = () => ({
  type: 'TOGGLE_GAME_READY',
});

const moveTile = (key, top, left, indexEmptyTile) => ({
  type: 'MOVE_TILE',
  key,
  top,
  left,
  indexEmptyTile,
});

export default {
  selectImage,
  logOut,
  createTileLists,
  toggleGameReady,
  moveTile,
};
