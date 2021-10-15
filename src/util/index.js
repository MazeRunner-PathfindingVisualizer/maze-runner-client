import {
  ALGORITHM,
  NODE_IMAGE_PATH,
  NODE_STATUS,
  SHORTEST,
  WEIGHTED,
} from '../constant';

export function getAlgorithmInfo(algorithm) {
  switch (algorithm) {
    case ALGORITHM.DFS: {
      return {
        weighted: WEIGHTED.FALSE,
        shortest: SHORTEST.NO_GUARANTEE,
      };
    }

    case ALGORITHM.BFS: {
      return {
        weighted: WEIGHTED.FALSE,
        shortest: SHORTEST.GUARANTEE,
      };
    }

    case ALGORITHM.DIJKSTRA: {
      return {
        weighted: WEIGHTED.TRUE,
        shortest: SHORTEST.GUARANTEE,
      };
    }

    case ALGORITHM.A_STAR_SEARCH: {
      return {
        weighted: WEIGHTED.TRUE,
        shortest: SHORTEST.GUARANTEE,
      };
    }

    case ALGORITHM.SWARM: {
      return {
        weighted: WEIGHTED.TRUE,
        shortest: SHORTEST.NO_GUARANTEE,
      };
    }

    case ALGORITHM.BIDIRECTIONAL_SWARM: {
      return {
        weighted: WEIGHTED.TRUE,
        shortest: SHORTEST.NO_GUARANTEE,
      };
    }

    case ALGORITHM.CONVERGENT_SWARM: {
      return {
        weighted: WEIGHTED.TRUE,
        shortest: SHORTEST.NO_GUARANTEE,
      };
    }

    case ALGORITHM.GREEDY_BEST_FIRST_SEARCH: {
      return {
        weighted: WEIGHTED.TRUE,
        shortest: SHORTEST.NO_GUARANTEE,
      };
    }

    default: {
      return {
        weighted: WEIGHTED.NONE,
        shortest: SHORTEST.NONE,
      };
    }
  }
}

export const getImgSrcPathByNodeStatus = (nodeStatus) => {
  switch (nodeStatus) {
    case NODE_STATUS.START: {
      return NODE_IMAGE_PATH.START;
    }
    case NODE_STATUS.MIDDLE: {
      return NODE_IMAGE_PATH.MIDDLE;
    }
    case NODE_STATUS.END: {
      return NODE_IMAGE_PATH.END;
    }
    case NODE_STATUS.WALL: {
      return NODE_IMAGE_PATH.WALL;
    }
    case NODE_STATUS.WEIGHTED: {
      return NODE_IMAGE_PATH.WEIGHTED;
    }
    default: {
      return '';
    }
  }
};

export const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export default { getAlgorithmInfo, rand };
