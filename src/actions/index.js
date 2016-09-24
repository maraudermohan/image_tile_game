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

export const moveTile = (index, top, left) => {
  return {
    type: 'MOVE_TILE',
    index,
    top,
    left
  };
}

export const decrementCounter = (counter) => {
  return {
    type: 'DECREMENT_COUNTER',
    counter
  };
}

export const log_out = () => {
  return {
    type: 'LOG_OUT'
  };
}

export const toggleGameReady = () => {
  return {
    type: 'TOGGLE_GAME_READY'
  };
}