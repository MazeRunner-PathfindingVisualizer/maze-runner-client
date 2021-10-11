import { NODE_STATUS } from '../constant';
import { MAZE } from '../constant/maze';

import { headerHeight } from '../App.module.css';
import { mazeDescriptionHeight } from '../components/MazeDescription.module.css';

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
};

export default { calcMazeBlockCount, createNodes, isFeatNode, calcPathNodeIds };
