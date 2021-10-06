// import { current } from '@reduxjs/toolkit';
import { NODE_STATUS } from '../constant';

const sumOfArrayElement = (array1, array2) => [
  array1[0] + array2[0],
  array1[1] + array2[1],
];

const getNextNodes = (centerNodeId, byId) => {
  const [i, j] = centerNodeId.split('-').map(Number);

  if (typeof i !== 'number' || typeof j !== 'number') {
    throw new Error('getNextNodes parameter(centerNodeId) format error.');
  }

  const nextNodes = [];
  const OFFSET = {
    0: [-1, 0],
    1: [0, 1],
    2: [1, 0],
    3: [0, -1],
  };

  for (let k = 0; k < Object.keys(OFFSET).length; k++) {
    const candidateNodeIndex = sumOfArrayElement([i, j], OFFSET[k]);
    const candidateNodeId = `${candidateNodeIndex[0]}-${candidateNodeIndex[1]}`;
    const candidateNode = byId[candidateNodeId];

    if (candidateNode && candidateNode.status !== NODE_STATUS.WALL) {
      nextNodes.unshift(candidateNode);
    }
  }

  return nextNodes;
};

export const DFS = (byId, startNodeId, targetNodeId) => {
  const stack = [byId[startNodeId]];
  const visitedNodeObject = {};
  const animatedNodes = [];

  while (stack.length) {
    const currentNode = stack.pop();

    animatedNodes.push(currentNode.id);

    visitedNodeObject[currentNode.id] = NODE_STATUS.VISITED;
    if (
      currentNode.status !== 'start' &&
      currentNode.status !== 'end' &&
      currentNode.status !== 'middle'
    ) {
      currentNode.status = NODE_STATUS.VISITED;
    }

    if (currentNode.id === targetNodeId) {
      return { result: 'success', animatedNodes };
    }

    const nextNodes = getNextNodes(currentNode.id, byId);
    // console.log(
    //   '⭕️',
    //   nextNodes.map((nextNode) => current(nextNode)),
    // );

    nextNodes.forEach((nextNode) => {
      const isVisitedNode = Object.prototype.hasOwnProperty.call(
        visitedNodeObject,
        nextNode.id,
      );

      if (!isVisitedNode) {
        // visitedNodeObject[nextNode.id] = NODE_STATUS.VISITED;
        byId[nextNode.id].previousNode = currentNode.id;
        stack.push(byId[nextNode.id]);
      }
    });
  }

  // console.log(visitedNodeObject);
  return { result: 'failure', animatedNodes };
};
