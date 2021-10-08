import { NODE_STATUS } from '../constant';
import { getNextNodes } from './common';

export const DFS = (byId, startNodeId, targetNodeId, animatedNodeIds) => {
  const stack = [byId[startNodeId]];
  const visitedNodeObject = {};

  while (stack.length) {
    const currentNode = stack.pop();

    const isVisitedNode = Object.prototype.hasOwnProperty.call(
      visitedNodeObject,
      currentNode.id,
    );

    if (isVisitedNode) {
      continue;
    }

    animatedNodeIds.push(currentNode.id);

    visitedNodeObject[currentNode.id] = NODE_STATUS.VISITED;

    if (currentNode.id === targetNodeId) {
      return { message: 'success', animatedNodeIds };
    }

    const nextNodes = getNextNodes(currentNode.id, byId);

    nextNodes.forEach((nextNode) => {
      const isVisitedNode = Object.prototype.hasOwnProperty.call(
        visitedNodeObject,
        nextNode.id,
      );

      if (!isVisitedNode) {
        byId[nextNode.id].previousNodeId = currentNode.id;
        stack.push(byId[nextNode.id]);
      }
    });
  }

  return { message: 'failure', animatedNodeIds };
};
