import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getImgSrcPathByNodeStatus } from '../util';

import style from './Node.module.css';

const Node = ({
  nodeId,
  handleMouseDown,
  handleMouseUp,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const targetNode = useSelector((state) => state.maze.nodes.byId[nodeId]);
  const src = getImgSrcPathByNodeStatus(targetNode.status);

  return (
    <>
      {src ? (
        <img
          src={src}
          className={`${style.Node} ${style[targetNode.status]}`}
          onMouseDown={(e) => {
            handleMouseDown(e, targetNode);
          }}
          onMouseUp={handleMouseUp}
          onMouseEnter={(e) => handleMouseEnter(e, targetNode)}
          onMouseLeave={handleMouseLeave}
          name={nodeId}
        />
      ) : (
        <div
          className={`${style.Node} ${style[targetNode.status]}`}
          onMouseDown={(e) => {
            handleMouseDown(e, targetNode);
          }}
          onMouseUp={handleMouseUp}
          onMouseEnter={(e) => handleMouseEnter(e, targetNode)}
          onMouseLeave={handleMouseLeave}
          name={nodeId}
        />
      )}
    </>
  );
};

Node.defaultProps = {
  handleMouseDown: () => {},
  handleMouseUp: () => {},
  handleMouseEnter: () => {},
  handleMouseLeave: () => {},
};

Node.propTypes = {
  nodeId: PropTypes.string.isRequired,
  handleMouseDown: PropTypes.func,
  handleMouseUp: PropTypes.func,
  handleMouseEnter: PropTypes.func,
  handleMouseLeave: PropTypes.func,
};

export default React.memo(Node);
