import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { NODE_STATUS } from '../constant';
import {
  changeCurrentJammingBlockType,
  selectCurrentJammingBlockType,
} from '../features/maze/mazeSlice';

import style from './NodeType.module.css';

const NodeType = ({ type }) => {
  const currentJammingBlockType = useSelector(selectCurrentJammingBlockType);
  const dispatch = useDispatch();
  const { id, title, imagePath } = type;

  const isJammingBlock = id === NODE_STATUS.WEIGHTED || id === NODE_STATUS.WALL;
  const isSelected = currentJammingBlockType === id;

  return (
    <div
      className={`${style.NodeType} ${isSelected && style.SelectedJammingNode}`}
      onClick={() =>
        isJammingBlock ? dispatch(changeCurrentJammingBlockType(id)) : null
      }
    >
      <img src={imagePath} alt={title} className={style.NodeTypeImage} />
      <span>{title}</span>
    </div>
  );
};

NodeType.propTypes = {
  type: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
  }).isRequired,
};

export default NodeType;
