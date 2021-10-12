import {
  ALGORITHM,
  NODE_PROPERTY,
  NODE_STATUS,
  NODE_STATUS_LIST,
} from '../constant';
import { MAZE } from '../constant/maze';

import { headerHeight } from '../App.module.css';
import { mazeDescriptionHeight } from '../components/MazeDescription.module.css';
import DFS from '../algorithms/DFS';
import BFS from '../algorithms/BFS';
import { Dijkstra } from '../algorithms/Dijkstra';

const HEADER_HEIGHT_REM = parseInt(headerHeight.slice(0, -3), 10);
const MAZE_DESC_HEIGHT_REM = parseInt(mazeDescriptionHeight.slice(0, -3), 10);
const REM_TO_PX = 16;

const QUARTER = 0.25;
const HALF = 0.5;
const TRIPLE = 3;

export const calcMazeBlockCount = (widthPx, heightPx) => {
  const widthCount =
    (widthPx - MAZE.MARGIN_PX * MAZE.DOUBLE) / MAZE.BLOCK_SIZE_PX;
  const heightCount =
    (heightPx - REM_TO_PX * (HEADER_HEIGHT_REM + MAZE_DESC_HEIGHT_REM)) /
    MAZE.BLOCK_SIZE_PX;

  return {
    widthCount: parseInt(widthCount, 10),
    heightCount: parseInt(heightCount, 10),
  };
};

const calcNewNodeStatus = (indexes, size) => {
  const { rowIndex, colIndex } = indexes;
  const { widthCount, heightCount } = size;

  if (
    rowIndex === parseInt(heightCount * HALF, 10) &&
    colIndex === parseInt(widthCount * QUARTER, 10)
  ) {
    return 'start';
  }

  if (
    rowIndex === parseInt(heightCount * HALF, 10) &&
    colIndex === parseInt(widthCount * TRIPLE * QUARTER, 10)
  ) {
    return 'end';
  }

  return 'unvisited';
};

export const createNodes = (widthCount, heightCount, weight = 1) => {
  const nodes = { byId: {}, allIds: [] };

  for (let i = 0; i < heightCount; i++) {
    const newRowIds = [];
    for (let j = 0; j < widthCount; j++) {
      const newNodeId = `${i}-${j}`;
      const newNodeStatus = calcNewNodeStatus(
        { rowIndex: i, colIndex: j },
        { widthCount, heightCount },
      );

      const newNode = {
        id: newNodeId,
        status: newNodeStatus,
        previousNodeId: null,
        distance: Infinity,
        weight,
      };

      nodes.byId[newNodeId] = newNode;
      newRowIds.push(newNodeId);
    }
    nodes.allIds.push(newRowIds);
  }

  return nodes;
};

export const isFeatNode = (nodeStatus) => {
  if (typeof nodeStatus !== 'string') {
    throw new Error(
      'Type of param of isFeatNode function have to be a string.',
    );
  }

  if (nodeStatus === NODE_STATUS.START) {
    return true;
  }
  if (nodeStatus === NODE_STATUS.MIDDLE) {
    return true;
  }
  if (nodeStatus === NODE_STATUS.END) {
    return true;
  }

  return false;
};

export const calcPathNodeIds = (animatedNodeIds, byId) => {
  console.log(animatedNodeIds, byId);

  if (Array.isArray(animatedNodeIds[0])) {
    const animatedPathNodeIds = animatedNodeIds.map((route) => {
      const animatedPathNodeIds = [];

      animatedPathNodeIds.push(route[route.length - 1]);

      let currentNodeId = animatedPathNodeIds[0];
      let currentNode = byId[currentNodeId];

      while (
        currentNode.previousNodeId &&
        currentNode.status !== NODE_STATUS.START &&
        currentNode.status !== NODE_STATUS.MIDDLE
      ) {
        currentNodeId = currentNode.previousNodeId;
        currentNode = byId[currentNodeId];

        if (currentNode.status !== NODE_STATUS.START) {
          animatedPathNodeIds.push(currentNodeId);
        }
      }

      return animatedPathNodeIds;
    });

    console.log(animatedPathNodeIds.flat());
    return animatedPathNodeIds.flat();
  } else {
    const animatedPathNodeIds = [];

    animatedPathNodeIds.push(animatedNodeIds[animatedNodeIds.length - 1]);

    let currentNodeId = animatedPathNodeIds[0];
    let currentNode = byId[currentNodeId];

    while (
      currentNode.previousNodeId &&
      currentNode.status !== NODE_STATUS.START
    ) {
      currentNodeId = currentNode.previousNodeId;
      currentNode = byId[currentNodeId];

      if (currentNode.status !== NODE_STATUS.START) {
        animatedPathNodeIds.push(currentNodeId);
      }
    }

    return animatedPathNodeIds;
  }
};

export const resetNodeProperties = (node, options) => {
  if (!Array.isArray(options)) {
    throw new Error('resetNodeProperties options parameter must be an array');
  }

  const resetObj = options.reduce((obj, cur) => {
    switch (cur) {
      case NODE_PROPERTY.STATUS: {
        obj.status = NODE_STATUS.UNVISITED;
        return obj;
      }
      case NODE_PROPERTY.DISTANCE: {
        obj.distance = Infinity;
        return obj;
      }
      case NODE_PROPERTY.WEIGHT: {
        obj.weight = 1;
        return obj;
      }
      case NODE_PROPERTY.PREVIOUS_NODE_ID: {
        obj.previousNodeId = null;
        return obj;
      }
      case 'All': {
        obj.status = NODE_STATUS.UNVISITED;
        obj.distance = Infinity;
        obj.weight = 1;
        obj.previousNodeId = null;
        return obj;
      }
      default: {
        return obj;
      }
    }
  }, {});

  Object.assign(node, resetObj);
};

export const setNodeProperties = (node, obj) => {
  if (typeof obj !== 'object') {
    throw new Error('setNodeProperties obj parameter must be an object');
  }

  const hasStatus = Object.prototype.hasOwnProperty.call(obj, 'status');

  if (hasStatus) {
    const isValidStatus = NODE_STATUS_LIST.includes(obj.status);

    if (!isValidStatus) {
      throw new Error('setNodeProperties obj has invalid status', obj.status);
    }
  }

  const hasDistance = Object.prototype.hasOwnProperty.call(obj, 'distance');

  if (hasDistance) {
    const isValidDistance = typeof obj.distance === 'number';

    if (!isValidDistance) {
      throw new Error(
        'setNodeProperties obj has invalid distance - distance should be a number type',
      );
    }
  }

  const hasWeight = Object.prototype.hasOwnProperty.call(obj, 'weight');

  if (hasWeight) {
    const isValidWeight = typeof obj.weight === 'number';

    if (!isValidWeight) {
      throw new Error(
        'setNodeProperties obj has invalid weight - weight should be a number type',
      );
    }
  }

  const hasPreviousNodeId = Object.prototype.hasOwnProperty.call(
    obj,
    'previousNodeId',
  );

  if (hasPreviousNodeId) {
    const isValidPreviousNodeId = typeof obj.weight === 'string';

    if (!isValidPreviousNodeId) {
      throw new Error(
        'setNodeProperties obj has invalid weight - weight should be a string type',
      );
    }
  }

  Object.assign(node, obj);
};

export const changeToWallNode = (targetNode) => {
  setNodeProperties(targetNode, {
    status: NODE_STATUS.WALL,
  });
  resetNodeProperties(targetNode, [
    NODE_PROPERTY.DISTANCE,
    NODE_PROPERTY.PREVIOUS_NODE_ID,
    NODE_PROPERTY.WEIGHT,
  ]);
};

export const changeToWeightNode = (targetNode, weight) => {
  setNodeProperties(targetNode, {
    status: NODE_STATUS.WEIGHTED,
    weight,
  });
  resetNodeProperties(targetNode, [
    NODE_PROPERTY.DISTANCE,
    NODE_PROPERTY.PREVIOUS_NODE_ID,
  ]);
};

export const changeToMiddleNode = (targetNode) => {
  setNodeProperties(targetNode, {
    status: NODE_STATUS.MIDDLE,
  });
  resetNodeProperties(targetNode, [
    NODE_PROPERTY.DISTANCE,
    NODE_PROPERTY.PREVIOUS_NODE_ID,
    NODE_PROPERTY.WEIGHT,
  ]);
};

export const runAlgorithm = (
  algorithmName,
  startNodeId,
  middleNodeId,
  endNodeId,
  nodes,
) => {
  let result;

  console.log('🔥', algorithmName, startNodeId, middleNodeId, endNodeId, nodes);

  switch (algorithmName) {
    case ALGORITHM.DFS: {
      if (middleNodeId) {
        let route1 = DFS(nodes.byId, startNodeId, middleNodeId);
        let route2 = DFS(nodes.byId, middleNodeId, endNodeId);

        result = {
          animatedNodeIds: [route1.animatedNodeIds, route2.animatedNodeIds],
        };
        result.message =
          route1.message === 'success' && route2.message === 'success'
            ? 'success'
            : 'failure';
      } else {
        result = DFS(nodes.byId, startNodeId, endNodeId);
      }

      break;
    }

    case ALGORITHM.BFS: {
      if (middleNodeId) {
        let route1 = BFS(nodes.byId, startNodeId, middleNodeId);
        console.log('#1. route1: ', route1);
        let route2 = BFS(nodes.byId, middleNodeId, endNodeId);
        console.log('#2. route2: ', route2);
        result = {
          animatedNodeIds: [route1.animatedNodeIds, route2.animatedNodeIds],
        };
        result.message =
          route1.message === 'success' && route2.message === 'success'
            ? 'success'
            : 'failure';
      } else {
        result = BFS(nodes.byId, startNodeId, endNodeId);
      }

      break;
    }

    case ALGORITHM.DIJKSTRA: {
      if (middleNodeId) {
        let route1 = Dijkstra(nodes.byId, startNodeId, middleNodeId);
        let route2 = Dijkstra(nodes.byId, middleNodeId, endNodeId);

        result = {
          animatedNodeIds: [route1.animatedNodeIds, route2.animatedNodeIds],
        };
        result.message =
          route1.message === 'success' && route2.message === 'success'
            ? 'success'
            : 'failure';
      } else {
        result = Dijkstra(nodes.byId, startNodeId, endNodeId);
      }

      break;
    }

    default: {
      result = { message: 'check your algorithm', animatedNodeIds: [] };
      break;
    }
  }

  console.log('#3. result: ', result);
  return result;
};

export default {
  calcMazeBlockCount,
  createNodes,
  isFeatNode,
  calcPathNodeIds,
  resetNodeProperties,
  setNodeProperties,
  changeToWallNode,
  changeToWeightNode,
  changeToMiddleNode,
  runAlgorithm,
};
