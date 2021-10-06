import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  mouseDown,
  mouseUp,
  changeNormalNode,
  changeFeatNode,
  clickFeatNode,
  selectAllIds,
} from '../features/maze/mazeSlice';
import Node from './Node';

import style from './Maze.module.css';

const Maze = () => {
  const allIds = useSelector(selectAllIds);
  const dispatch = useDispatch();

  const handleMouseDown = useCallback(
    (e, byId) => {
      e.preventDefault();
      const nodeId = e.target.getAttribute('name');
      console.log(nodeId, byId);
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
    },
    [dispatch],
  );

  console.log('💩', handleMouseDown);

  const handleMouseUp = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(mouseUp());
    },
    [dispatch],
  );

  const handleMouseEnter = useCallback(
    (e, byId, isMouseDown, isFeatNodeClick) => {
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
    },
    [dispatch],
  );

  const handleMouseLeave = useCallback(
    (e) => {
      e.preventDefault();
    },
    [dispatch],
  );

  console.log('render!');

  return (
    <div className={style.Maze}>
      {allIds.map((row, index) => (
        <div className={style.MazeRow} key={index}>
          {row.map((nodeId) => {
            return (
              <Node
                nodeId={nodeId}
                temp={handleMouseDown}
                handleMouseUp={handleMouseUp}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                key={nodeId}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Maze;
