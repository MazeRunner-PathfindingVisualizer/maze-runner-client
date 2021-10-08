import { NODE_STATUS } from '../../constant';

const sumOfArrayElement = (array1, array2) => [
  array1[0] + array2[0],
  array1[1] + array2[1],
];

export const getNextNodes = (centerNodeId, byId) => {
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

export default { getNextNodes };
