import React from 'react';
import PropTypes from 'prop-types';

import style from './NodeType.module.css';

const NodeType = ({ type }) => {
  const { title, imagePath } = type;
  return (
    <div className={style.NodeType}>
      <img src={imagePath} alt="startNode" className={style.NodeTypeImage} />
      <span>{title}</span>
    </div>
  );
};

NodeType.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
  }).isRequired,
};

export default NodeType;
