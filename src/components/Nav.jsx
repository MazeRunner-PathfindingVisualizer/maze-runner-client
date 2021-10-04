import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropdown } from 'react-icons/io';

import Dropdown from './Dropdown';
import { NAV, NAV_LIST } from '../constant';
import { setMenu, selectMenu } from '../features/nav/navSlice';
import {
  setAlgorithm,
  setSpeed,
} from '../features/mazeOptions/mazeOptionsSlice';

import style from './Nav.module.css';

const Nav = () => {
  const dispatch = useDispatch();
  const menuStatus = useSelector(selectMenu);

  function handleOnClick(e) {
    if (menuStatus === e.currentTarget.name) {
      dispatch(setMenu('none'));
      return;
    }
    dispatch(setMenu(e.currentTarget.name));
  }

  function handleOnDropdownClick(e) {
    e.preventDefault();

    if (menuStatus === NAV.ALGORITHMS) {
      dispatch(setAlgorithm(e.target.name));
    }

    if (menuStatus === NAV.SPEED) {
      dispatch(setSpeed(e.target.name));
    }
  }

  return (
    <nav className={style.Nav}>
      <ul className={style.NavItems}>
        {NAV_LIST.map((item) => (
          <li className={style.NavItem} key={item.title}>
            <button
              className={style.NavButton}
              onClick={handleOnClick}
              name={item.title}
            >
              {item.title}
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
