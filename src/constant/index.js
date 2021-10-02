export const ALGORITHM = {
  DFS: 'DFS',
  BFS: 'BFS',
  DIJKSTRA: 'Dijkstra',
  A_STAR_SEARCH: 'A * search',
  SWARM: 'Swarm',
  BIDIRECTIONAL_SWARM: 'Bidirectional swarm',
  CONVERGENT_SWARM: 'Convergent swarm',
  GREEDY_BEST_FIRST_SEARCH: 'Greedy best-first search',
};

export const ALGORITHMS = [
  ALGORITHM.DFS,
  ALGORITHM.BFS,
  ALGORITHM.DIJKSTRA,
  ALGORITHM.A_STAR_SEARCH,
  ALGORITHM.SWARM,
  ALGORITHM.BIDIRECTIONAL_SWARM,
  ALGORITHM.CONVERGENT_SWARM,
  ALGORITHM.GREEDY_BEST_FIRST_SEARCH,
];

export const MAZE_AND_PATTERNS = [
  'Recursive division',
  'Recursive division (vertical skew)',
  'Recursive division (horizontal skew)',
  'Basic random maze',
  'Basic weight maze',
  'Simple stair pattern',
];

export const CLEAR_MAZE = ['Clear all', 'Clear walls & weight`', 'Clear path'];

export const SPEED = ['fast', 'middle', 'low'];

export const NAV = {
  COMPARE_MODE: 'Compare mode',
  ALGORITHMS: 'Algorithms',
  MAZES_AND_PATTERNS: 'Mazes & Patterns',
  ADD_MIDDLE_POINT: 'Add middle point',
  START: 'Start!',
  CLEAR_MAZE: 'Clear maze',
  SAVE_AND_SHARE: 'Save & Share',
  SPEED: 'Speed',
};

export const NAV_LIST = [
  {
    title: NAV.COMPARE_MODE,
    hasDropdown: false,
  },
  {
    title: NAV.ALGORITHMS,
    hasDropdown: true,
    child: ALGORITHMS,
  },
  {
    title: NAV.MAZES_AND_PATTERNS,
    hasDropdown: true,
    child: MAZE_AND_PATTERNS,
  },
  {
    title: NAV.ADD_MIDDLE_POINT,
    hasDropdown: false,
  },
  {
    title: NAV.START,
    hasDropdown: false,
  },
  {
    title: NAV.CLEAR_MAZE,
    hasDropdown: true,
    child: CLEAR_MAZE,
  },
  {
    title: NAV.SAVE_AND_SHARE,
    hasDropdown: false,
  },
  {
    title: NAV.SPEED,
    hasDropdown: true,
    child: SPEED,
  },
];

export const MAZE_OPTIONS = ['Algorithm', 'Speed', 'Weighted', 'Shortest'];

export const NODE_TYPES = [
  {
    title: 'Start Node',
    imagePath: '/image/startNode.png',
  },
  {
    title: 'End Node',
    imagePath: '/image/endNode.png',
  },
  {
    title: 'Item Node',
    imagePath: '/image/itemNode.png',
  },
  {
    title: 'Weight Node',
    imagePath: '/image/weightNode.png',
  },
  {
    title: 'Wall Node',
    imagePath: '/image/wallNode.png',
  },
];

export const WEIGHTED = {
  TRUE: 'true',
  FALSE: 'false',
  NONE: 'none',
};

export const SHORTEST = {
  GUARANTEE: 'guarantee',
  NO_GUARANTEE: 'no-guarantee',
  NONE: 'none',
};

export default {
  ALGORITHM,
  ALGORITHMS,
  MAZE_AND_PATTERNS,
  CLEAR_MAZE,
  SPEED,
  NAV,
  NAV_LIST,
  MAZE_OPTIONS,
  NODE_TYPES,
  WEIGHTED,
  SHORTEST,
};
