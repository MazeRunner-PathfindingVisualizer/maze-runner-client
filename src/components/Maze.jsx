import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import {
  mouseDown,
  mouseUp,
  changeNormalNode,
  changeFeatNode,
  clickFeatNode,
  visitNode,
  selectAllIds,
  selectIsMouseDown,
  selectIsFeatNodeClick,
  selectAnimatedNodeIds,
  setAnimationTimeoutId,
  endAnimation,
  startAnimation,
  selectAnimatedPathNodeIds,
  markPathNode,
  selectAnimatedMazeNodeIds,
  drawMazeNode,
  selectCurrentJammingBlockType,
} from '../features/maze/mazeSlice';
import { selectSpeed } from '../features/mazeOptions/mazeOptionsSlice';
import Node from './Node';
import { SPEED_MS } from '../constant';

import style from './Maze.module.css';

const Maze = () => {
  const allIds = useSelector(selectAllIds, shallowEqual);
  const isMouseDown = useSelector(selectIsMouseDown);
  const isFeatNodeClick = useSelector(selectIsFeatNodeClick);
  const animatedNodeIds = useSelector(selectAnimatedNodeIds);
  const animationSpeed = useSelector(selectSpeed);
  const animatedPathNodeIds = useSelector(selectAnimatedPathNodeIds);
  const animatedMazeNodeIds = useSelector(selectAnimatedMazeNodeIds);
  const currentJammingBlockType = useSelector(selectCurrentJammingBlockType);

  const dispatch = useDispatch();

  const handleMouseDown = useCallback(
    (e, targetNode) => {
      e.preventDefault();
      const nodeId = e.target.getAttribute('name');
      const nodeStatus = targetNode.status;

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

  const handleMouseUp = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(mouseUp());
    },
    [dispatch],
  );

  const handleMouseEnter = useCallback(
    (e, targetNode) => {
      e.preventDefault();
      const nodeId = e.target.getAttribute('name');

      if (isMouseDown && isFeatNodeClick) {
        dispatch(
          changeFeatNode({
            targetNodeId: nodeId,
            targetNodeStatus: targetNode.status,
          }),
        );
      } else if (isMouseDown) {
        dispatch(changeNormalNode(nodeId));
      }
    },
    [dispatch, isMouseDown, isFeatNodeClick],
  );

  const handleMouseLeave = useCallback(
    (e) => {
      e.preventDefault();
    },
    [dispatch],
  );

  useEffect(() => {
    if (!animatedNodeIds.length) {
      return;
    }

    const animatedNodeIdsCopy = animatedNodeIds.slice();
    const animatedPathNodeIdsCopy = animatedPathNodeIds.slice();

    function animateNext(animatedNodeIds, animatedPathNodeIds) {
      const nodeId = animatedNodeIds[0];
      const pathNodeId = animatedPathNodeIds[animatedPathNodeIds.length - 1];

      if (!nodeId && !pathNodeId) {
        dispatch(endAnimation());
        return;
      }

      if (nodeId) {
        dispatch(visitNode(nodeId));

        animatedNodeIds.shift();

        return setTimeout(() => {
          const timeoutId = animateNext(animatedNodeIds, animatedPathNodeIds);

          dispatch(setAnimationTimeoutId(timeoutId));
        }, SPEED_MS[animationSpeed]);
      }

      if (pathNodeId) {
        dispatch(markPathNode(pathNodeId));

        animatedPathNodeIds.pop();

        return setTimeout(() => {
          const timeoutId = animateNext(animatedNodeIds, animatedPathNodeIds);

          dispatch(setAnimationTimeoutId(timeoutId));
        }, SPEED_MS[animationSpeed]);
      }
    }

    dispatch(startAnimation());
    const animationTimeoutId = animateNext(
      animatedNodeIdsCopy,
      animatedPathNodeIdsCopy,
    );
    dispatch(setAnimationTimeoutId(animationTimeoutId));
  }, [animatedNodeIds]);

  useEffect(() => {
    if (!animatedMazeNodeIds.length) {
      return;
    }

    const animatedMazeNodeIdsCopy = animatedMazeNodeIds.slice();

    function animateNext(animatedMazeNodeIds) {
      const nodeId = animatedMazeNodeIds[0];

      if (!nodeId) {
        dispatch(endAnimation());
        return;
      }

      dispatch(drawMazeNode({ nodeId, nodeStatus: currentJammingBlockType }));

      animatedMazeNodeIds.shift();

      return setTimeout(() => {
        const timeoutId = animateNext(animatedMazeNodeIds);

        dispatch(setAnimationTimeoutId(timeoutId));
      }, SPEED_MS[animationSpeed]);
    }

    dispatch(startAnimation());
    const animationTimeoutId = animateNext(animatedMazeNodeIdsCopy);
    dispatch(setAnimationTimeoutId(animationTimeoutId));
  }, [animatedMazeNodeIds]);

  return (
    <div className={style.Maze}>
      {allIds.map((row, index) => (
        <div className={style.MazeRow} key={index}>
          {row.map((nodeId) => (
            <Node
              nodeId={nodeId}
              handleMouseDown={handleMouseDown}
              handleMouseUp={handleMouseUp}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              key={nodeId}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maze;
