export const updateRowCol = (rowLength, colLength, tileWidth, tileHeight) => {
  return {
    type: 'UPDATE_ROW_COL',
    rowLength, 
    colLength, 
    tileWidth, 
    tileHeight
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

