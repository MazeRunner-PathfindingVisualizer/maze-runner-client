import React from 'react';
import { useSelector } from 'react-redux';

import MazeOption from './MazeOption';
import { MAZE_OPTIONS, NODE_TYPES } from '../constant';
import { selectMazeOptions } from '../features/mazeOptions/mazeOptionsSlice';

// import startNode from '/image/star tNode.png';

import style from './MazeDescription.module.css';
import NodeType from './NodeType';

const MazeDescription = () => {
  const currentMazeOptions = useSelector(selectMazeOptions);

  return (
    <section className={style.MazeDescription}>
      <div className={style.NodeInfo}>
        {NODE_TYPES.map((nodeType) => (
          <NodeType type={nodeType} key={nodeType.title} />
        ))}
      </div>
      <div className={style.SelectedOptionInfo}>
        {MAZE_OPTIONS.map((mazeOption) => (
          <MazeOption
            item={{
              [mazeOption]: currentMazeOptions[mazeOption.toLowerCase()],
            }}
            key={mazeOption}
          />
        ))}
      </div>
    </section>
  );
};

export default MazeDescription;
