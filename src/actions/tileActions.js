export const moveTile = (index, top, left) => {
  return {
    type: 'MOVE_TILE',
    index,
    top,
    left
  };
}

export const update_list = (content) => {
  return {
    type: 'UPDATE_LIST',
    content
  };
}
