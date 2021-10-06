// import { current } from '@reduxjs/toolkit';
import { NODE_STATUS } from '../constant';
import { getNextNodes } from './common';

export const BFS = (byId, startNodeId, targetNodeId) => {
  const stack = [byId[startNodeId]];
  const visitedNodeObject = {};
  const animatedNodes = [];

  while (stack.length) {
    const currentNode = stack.shift();

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

    nextNodes.forEach((nextNode) => {
      const isVisitedNode = Object.prototype.hasOwnProperty.call(
        visitedNodeObject,
        nextNode.id,
      );

      if (!isVisitedNode) {
        visitedNodeObject[nextNode.id] = NODE_STATUS.VISITED;
        byId[nextNode.id].previousNode = currentNode.id;
        stack.push(byId[nextNode.id]);
      }
    });
  }

  return { result: 'failure', animatedNodes };
};
