import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Nav from './components/Nav';
import MazeDescription from './components/MazeDescription';
import Maze from './components/Maze';
import useWindowSize from './components/hook/useWindowSize';
import {
  createMaze,
  selectMazeWidth,
  selectMazeHeight,
} from './features/maze/mazeSlice';

import style from './App.module.css';
import {
  closeSideMenuButtonStatus,
  selectSideMenuButtonStatus,
} from './features/nav/navSlice';

function App() {
  const dispatch = useDispatch();
  const { width, height } = useWindowSize();

  const maze = {};
  maze.width = useSelector(selectMazeWidth);
  maze.height = useSelector(selectMazeHeight);

  const isSideMenuButtonOpen = useSelector(selectSideMenuButtonStatus);

  useEffect(() => {
    if (!maze.width || !maze.height) {
      dispatch(createMaze({ width, height }));
    }

    if (isSideMenuButtonOpen) {
      dispatch(closeSideMenuButtonStatus());
    }
  }, [width, height]);

  return (
    <div className={style.App}>
      <header className={style.AppHeader}>
        <Nav />
      </header>
      <main className={style.AppMain}>
        <MazeDescription />
        <Maze />
      </main>
    </div>
  );
}

export default App;
