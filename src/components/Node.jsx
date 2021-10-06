import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { selectMaze } from '../features/maze/mazeSlice';
import { getImgSrcPathByNodeStatus } from '../util';

import style from './Node.module.css';

const Node = ({
  nodeId,
  temp,
  handleMouseUp,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const { nodes, isMouseDown, isFeatNodeClick } = useSelector(selectMaze);
  const { byId } = nodes;
  const src = getImgSrcPathByNodeStatus(byId[nodeId].status);
  console.log('⭕️', temp);

  return (
    <>
      {src ? (
        <img
          src={src}
          className={style.Node}
          onMouseDown={(e) => {
            console.log('🌟', byId, e);
            // temp(e, byId);
          }}
          onMouseUp={handleMouseUp}
          onMouseEnter={(e) =>
            handleMouseEnter(e, byId, isMouseDown, isFeatNodeClick)
          }
          onMouseLeave={handleMouseLeave}
          name={nodeId}
        />
      ) : (
        <div
          className={style.Node}
          onMouseDown={temp}
          onMouseUp={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          name={nodeId}
        />
      )}
    </>
  );
};

Node.defaultProps = {
  temp: () => {},
  handleMouseUp: () => {},
  handleMouseEnter: () => {},
  handleMouseLeave: () => {},
};

Node.propTypes = {
  nodeId: PropTypes.string.isRequired,
  temp: PropTypes.func,
  handleMouseUp: PropTypes.func,
  handleMouseEnter: PropTypes.func,
  handleMouseLeave: PropTypes.func,
};

export default React.memo(Node);
