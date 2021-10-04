import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  mouseDown,
  mouseUp,
  selectMaze,
  changeNormalNode,
  changeFeatNode,
  clickFeatNode,
} from '../features/maze/mazeSlice';

import style from './Maze.module.css';

const Maze = () => {
  const { nodes, isMouseDown, isFeatNodeClick } = useSelector(selectMaze);
  const { byId, allIds } = nodes;
  const dispatch = useDispatch();

  function handleMouseDown(e) {
    e.preventDefault();
    const nodeId = e.target.getAttribute('name');
    const nodeStatus = byId[nodeId].status;

    dispatch(mouseDown());

    if (
      nodeStatus === 'start' ||
      nodeStatus === 'end' ||
      nodeStatus === 'middle'
    ) {
      dispatch(clickFeatNode({ nodeId, nodeStatus }));
    } else {
      dispatch(changeNormalNode(nodeId));
    }
  }

  function handleMouseUp(e) {
    e.preventDefault();
    dispatch(mouseUp());
  }

  function handleMouseEnter(e) {
    e.preventDefault();
    const nodeId = e.target.getAttribute('name');

    if (isMouseDown && isFeatNodeClick) {
      dispatch(
        changeFeatNode({
          targetNodeId: nodeId,
          targetNodeStatus: byId[nodeId].status,
        }),
      );
    } else if (isMouseDown) {
      dispatch(changeNormalNode(nodeId));
    }
  }

  function handleMouseLeave(e) {
    e.preventDefault();
  }

  return (
    <div className={style.Maze}>
      {allIds.map((row, index) => (
        <div className={style.MazeRow} key={index}>
          {row.map((nodeId, index) => (
            <div
              className={`${style.MazeNode} ${style[byId[nodeId].status]}`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              name={nodeId}
              key={index}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maze;
