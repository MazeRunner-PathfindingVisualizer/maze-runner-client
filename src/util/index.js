import { ALGORITHM, SHORTEST, WEIGHTED } from '../constant';

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

export default { getAlgorithmInfo };
