export const updateRowCol = (rowLength, colLength, tileWidth, tileHeight, width, height, shuffleCounter, isGameReady) => {
  return {
    type: 'UPDATE_ROW_COL',
    rowLength, 
    colLength, 
    tileWidth, 
    tileHeight,
    width,
    height,
    shuffleCounter,
    isGameReady
  };
}

export const updateTileParams = (index, topCounter, leftCounter) => {
  return {
    type: 'UPDATE_TILE_PARAMS',
    index,
    topCounter,
    leftCounter
  };
}

export const update_list = (content) => {
  return {
    type: 'UPDATE_LIST',
    content
  };
}

export const decrementCounter = (counter) => {
  return {
    type: 'DECREMENT_COUNTER',
    counter
  };
}

export const toggleGameReady = () => {
  return {
    type: 'TOGGLE_GAME_READY'
  };
}