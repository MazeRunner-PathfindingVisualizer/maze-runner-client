import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Nav from './components/Nav';
import MazeDescription from './components/MazeDescription';
import Maze from './components/Maze';
import useWindowSize from './components/hook/useWindowSize';
import { selectMaze, createMaze } from './features/maze/mazeSlice';

import style from './App.module.css';

function App() {
  const { width, height } = useWindowSize();
  const dispatch = useDispatch();
  const maze = useSelector(selectMaze);

  useEffect(() => {
    if (!maze.width || !maze.height) {
      dispatch(createMaze({ width, height }));
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
