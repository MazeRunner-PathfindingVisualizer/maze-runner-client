import React from 'react';
import { useSelector } from 'react-redux';

import MazeOption from './MazeOption';
import {
  MAZE_OPTIONS,
  NODE_STATUS,
  NODE_TYPES,
  USER_GUIDE_TEXT,
} from '../constant';
import {
  selectAlgorithm,
  selectMazeOptions,
} from '../features/mazeOptions/mazeOptionsSlice';

import style from './MazeDescription.module.css';
import NodeType from './NodeType';

const MazeDescription = () => {
  const mazeOptions = useSelector(selectMazeOptions);
  const mazeAlgorithm = useSelector(selectAlgorithm);

  function isHurdleNode(nodeType) {
    return (
      nodeType.id === NODE_STATUS.WEIGHTED || nodeType.id === NODE_STATUS.WALL
    );
  }

  return (
    <section className={style.MazeDescription}>
      <div className={style.NodeInfo}>
        {NODE_TYPES.map(
          (nodeType) =>
            isHurdleNode(nodeType) || (
              <NodeType type={nodeType} key={nodeType.title} />
            ),
        )}
        <div className={style.HurdleNodeWrapper}>
          {NODE_TYPES.map(
            (nodeType) =>
              isHurdleNode(nodeType) && (
                <NodeType type={nodeType} key={nodeType.title} />
              ),
          )}
          <div className={style.NodeInfoMemo}>
            <img
              className={style.NodeInfoMemoArrow}
              src={'/image/arrowPigTail.png'}
              alt="arrow pig tail shape"
            />
            {USER_GUIDE_TEXT.CLICK_ME}
          </div>
        </div>
      </div>
      {mazeAlgorithm === 'none' ? (
        <div className={style.SelectedOptionInfo}>
          <span className={style.AlgorithmSelectMessage}>
            {USER_GUIDE_TEXT.SELECT_YOUR_ALGO}
          </span>
        </div>
      ) : (
        <div className={style.SelectedOptionInfo}>
          {MAZE_OPTIONS.map((mazeOption) => (
            <MazeOption
              item={{
                [mazeOption]: mazeOptions[mazeOption.toLowerCase()],
              }}
              key={mazeOption}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default React.memo(MazeDescription);
