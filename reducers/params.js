const imageSelected = (state = false, action) => {
  switch (action.type) {
    case 'SELECT_IMAGE': {
      return action.payload; // sets { url,width,height,rowLength,colLength,tileWidth,tileHeight}
    }

    case 'LOG_OUT': {
      return false;
    }

    default:
      return state;
  }
};

const tileCssList = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_TILE_LISTS': {
      return action.tileCssList; // sets css for each tile { top, left }
    }

    case 'MOVE_TILE': {
      const obj = { ...state };
      obj[action.key] = { ...obj[action.key], top: action.top, left: action.left };
      return obj;
    }

    case 'LOG_OUT': {
      return [];
    }

    default:
      return state;
  }
};

const tileOrderList = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_TILE_LISTS': {
      return action.tileOrderList; // maintains the current order of the jumbled tiles
    }

    case 'MOVE_TILE': {
      const obj = { ...state };
      const temp = obj[action.key];
      obj[action.key] = obj[action.indexEmptyTile];
      obj[action.indexEmptyTile] = temp;
      return obj;
    }

    case 'LOG_OUT': {
      return [];
    }

    default:
      return state;
  }
};

const gameState = (state = false, action) => {
  switch (action.type) {
    case 'SELECT_IMAGE':
      return { isImageSelected: true };

    case 'CREATE_TILE_LISTS':
      return { ...state, areTilesCreated: true, isGameReady: false };

    case 'TOGGLE_GAME_READY':
      return { ...state, isGameReady: true };

    case 'LOG_OUT':
      return false;

    default:
      return state;
  }
};

const shuffleCounter = (state = 50, action) => {
  switch (action.type) {
    case 'TOGGLE_GAME_READY':
      return -1;

    case 'MOVE_TILE':
      return (state > 0 ? state - 1 : state);

    case 'LOG_OUT':
      return 50;

    default:
      return state;
  }
};


const moveCounter = (state = 0, action) => {
  switch (action.type) {
    case 'TOGGLE_GAME_READY':
      return 100;

    case 'MOVE_TILE':
      return (state > 0 ? state - 1 : state);

    case 'LOG_OUT':
      return 0;

    default:
      return state;
  }
};

export default {
  imageSelected,
  gameState,
  tileCssList,
  tileOrderList,
  shuffleCounter,
  moveCounter,
};
