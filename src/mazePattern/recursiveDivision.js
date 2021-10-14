// import { NODE_STATUS } from '../constant';

const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const isHeightLongThanWidth = (rowBegin, rowEnd, colBegin, colEnd) => {
  return rowEnd - (rowBegin + 2) > colEnd - colBegin;
};

const isMazeBorder = (row, col, widthCount, heightCount) => {
  if (row === 0 || row === heightCount - 1) {
    return true;
  }
  if (col === 0 || col === widthCount - 1) {
    return true;
  }
  return false;
};

export const recursiveDivisionWrapper = (
  skew = 'horizontal',
  widthCount,
  heightCount,
  nodes,
) => {
  const animatedMazeNodeIds = [];
  nodes.allIds.flat().forEach((nodeId) => {
    const [row, col] = nodeId.split('-').map(Number);

    if (isMazeBorder(row, col, widthCount, heightCount)) {
      animatedMazeNodeIds.push(nodeId);
    }
  });

  recursiveDivision(
    skew,
    0,
    heightCount - 1,
    0,
    widthCount - 1,
    nodes,
    animatedMazeNodeIds,
  );
  return animatedMazeNodeIds;
};

export const recursiveDivision = (
  skew,
  rowBeginIndex,
  rowEndIndex,
  colBeginIndex,
  colEndIndex,
  nodes,
  animatedMazeNodeIds,
) => {
  console.log(skew, rowBeginIndex, rowEndIndex, colBeginIndex, colEndIndex);
  if (rowEndIndex <= rowBeginIndex || colEndIndex <= colBeginIndex) {
    return;
  }

  const randomRowsBox = [];
  const randomColsBox = [];
  if (skew === 'horizontal') {
    for (let row = rowBeginIndex; row <= rowEndIndex - 1; row += 2) {
      randomRowsBox.push(row);
    }

    for (let col = colBeginIndex; col <= colEndIndex - 1; col += 2) {
      randomColsBox.push(col);
    }
  } else if (skew === 'vertical') {
    for (let row = rowBeginIndex; row <= rowEndIndex - 1; row += 2) {
      randomRowsBox.push(row);
    }

    for (let col = colBeginIndex; col <= colEndIndex - 1; col += 2) {
      randomColsBox.push(col);
    }
  }

  const rowIndex = rand(0, randomRowsBox.length);
  const row = randomRowsBox[rowIndex];
  console.log(randomRowsBox, rowIndex, row);

  const colIndex = rand(0, randomColsBox.length);
  const col = randomColsBox[colIndex];
  console.log(randomColsBox, colIndex, col);

  nodes.allIds.flat().forEach((nodeId) => {
    const [idRow, idCol] = nodeId.split('-').map(Number);

    if (skew === 'horizontal') {
      if (colBeginIndex - 1 >= idCol || colEndIndex + 1 <= idCol) {
        return;
      }

      if (idRow === row && idCol !== col) {
        animatedMazeNodeIds.push(nodeId);
      }
    } else if (skew === 'vertical') {
      if (rowBeginIndex - 1 >= idRow || rowEndIndex + 1 <= idRow) {
        return;
      }

      if (idCol === col && idRow !== row) {
        animatedMazeNodeIds.push(nodeId);
      }
    }
  });

  if (skew === 'horizontal') {
    const nextSkewA = isHeightLongThanWidth(
      rowBeginIndex,
      row,
      colBeginIndex,
      colEndIndex,
    )
      ? 'horizontal'
      : 'vertical';
    const nextSkewB = isHeightLongThanWidth(
      row,
      rowEndIndex,
      colBeginIndex,
      colEndIndex,
    )
      ? 'horizontal'
      : 'vertical';

    recursiveDivision(
      nextSkewA,
      rowBeginIndex,
      row - 2,
      colBeginIndex,
      colEndIndex,
      nodes,
      animatedMazeNodeIds,
    );
    recursiveDivision(
      nextSkewB,
      row + 2,
      rowEndIndex,
      colBeginIndex,
      colEndIndex,
      nodes,
      animatedMazeNodeIds,
    );
  } else if (skew === 'vertical') {
    const nextSkewA = isHeightLongThanWidth(
      rowBeginIndex,
      rowEndIndex,
      colBeginIndex,
      col,
    )
      ? 'horizontal'
      : 'vertical';
    const nextSkewB = isHeightLongThanWidth(
      rowBeginIndex,
      rowEndIndex,
      col,
      colEndIndex,
    )
      ? 'horizontal'
      : 'vertical';

    recursiveDivision(
      nextSkewA,
      rowBeginIndex,
      rowEndIndex,
      colBeginIndex,
      col - 2,
      nodes,
      animatedMazeNodeIds,
    );
    recursiveDivision(
      nextSkewB,
      rowBeginIndex,
      rowEndIndex,
      col + 2,
      colEndIndex,
      nodes,
      animatedMazeNodeIds,
    );
  }
};

export default recursiveDivision;
