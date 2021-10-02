import React from 'react';

import MazeDescription from './components/MazeDescription';
import Nav from './components/Nav';

import style from './App.module.css';

function App() {
  return (
    <div className={style.App}>
      <header className={style.AppHeader}>
        <Nav />
      </header>
      <main className={style.AppMain}>
        <MazeDescription />
      </main>
    </div>
  );
}

export default App;
