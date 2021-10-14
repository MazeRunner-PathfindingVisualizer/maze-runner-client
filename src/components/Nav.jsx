import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropdown } from 'react-icons/io';

import Dropdown from './Dropdown';
import { CLEAR_MAZE, MAZE_AND_PATTERNS, NAV, NAV_LIST } from '../constant';
import { setMenu, selectMenu } from '../features/nav/navSlice';
import {
  selectAlgorithm,
  setAlgorithm,
  setSpeed,
} from '../features/mazeOptions/mazeOptionsSlice';
import {
  clearVisitedAndPathNodes,
  clearWallAndWeightNode,
  createMiddleNode,
  deleteMiddleNode,
  drawRecursiveDivisionMaze,
  endAnimation,
  selectAnimationTimeoutId,
  selectIsProgressive,
  selectMiddleNodeId,
  setAnimationTimeoutId,
} from '../features/maze/mazeSlice';

import style from './Nav.module.css';
import { startPathfinding } from '../features/maze/mazeSlice';

const Nav = () => {
  const menuStatus = useSelector(selectMenu);
  const isProgressive = useSelector(selectIsProgressive);
  const currentAlgorithm = useSelector(selectAlgorithm);
  const animationTimeoutId = useSelector(selectAnimationTimeoutId);
  const middleNodeId = useSelector(selectMiddleNodeId);
  const dispatch = useDispatch();

  function handleOnClick(e) {
    e.preventDefault();
    const currentClickedMenu = e.currentTarget.name;

    const dropdownNavList = NAV_LIST.filter(
      (navItem) => navItem.hasDropdown,
    ).map((navItem) => navItem.title);

    if (dropdownNavList.includes(currentClickedMenu)) {
      if (menuStatus === currentClickedMenu) {
        dispatch(setMenu('none'));
        return;
      }

      dispatch(setMenu(currentClickedMenu));
      return;
    }

    if (currentClickedMenu === NAV.START) {
      dispatch(clearVisitedAndPathNodes());
      dispatch(startPathfinding(currentAlgorithm));
    }

    if (currentClickedMenu === NAV.STOP) {
      if (animationTimeoutId) {
        clearTimeout(animationTimeoutId);
        dispatch(setAnimationTimeoutId(0));
        dispatch(endAnimation());
      }
    }

    if (currentClickedMenu === NAV.ADD_MIDDLE_POINT) {
      if (!middleNodeId) {
        dispatch(createMiddleNode());
      } else {
        dispatch(deleteMiddleNode());
      }
    }
  }

  function handleOnDropdownClick(e) {
    e.preventDefault();

    if (isProgressive) {
      alert('Wait for the pathfind algorithm to complete ⏳');
      return;
    }

    if (menuStatus === NAV.ALGORITHMS) {
      dispatch(setAlgorithm(e.target.name));
    }

    if (menuStatus === NAV.SPEED) {
      dispatch(setSpeed(e.target.name));
    }

    if (menuStatus === NAV.CLEAR_MAZE) {
      switch (e.target.name) {
        case CLEAR_MAZE.CLEAR_ALL: {
          dispatch(clearWallAndWeightNode());
          dispatch(clearVisitedAndPathNodes());
          return;
        }

        case CLEAR_MAZE.CLEAR_WALLS_AND_WEIGHT: {
          dispatch(clearWallAndWeightNode());
          return;
        }

        case CLEAR_MAZE.CLEAR_PATH: {
          dispatch(clearVisitedAndPathNodes());
          return;
        }
        default: {
          return;
        }
      }
    }

    if (menuStatus === NAV.MAZES_AND_PATTERNS) {
      switch (e.target.name) {
        case MAZE_AND_PATTERNS.RECURSIVE_DIVISION: {
          dispatch(drawRecursiveDivisionMaze());
          return;
        }
      }
    }

    dispatch(setMenu('none'));
  }

  return (
    <nav className={style.Nav}>
      <ul className={style.NavItems}>
        {NAV_LIST.map((item) => (
          <li
            className={`${style.NavItem} ${
              item.title === NAV.START && style.start
            }`}
            key={item.title}
          >
            <button
              className={style.NavButton}
              onClick={handleOnClick}
              name={
                item.title === NAV.START && isProgressive
                  ? NAV.STOP
                  : item.title
              }
            >
              {item.title === NAV.START && isProgressive
                ? NAV.STOP
                : item.title}
              {item.hasDropdown && <IoMdArrowDropdown />}
            </button>
            {item.hasDropdown && item.title === menuStatus && (
              <Dropdown
                items={item.child}
                handleOnClick={handleOnDropdownClick}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default React.memo(Nav);
