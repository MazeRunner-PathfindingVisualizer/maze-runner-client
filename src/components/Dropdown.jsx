import React from 'react';
import PropTypes from 'prop-types';

import style from './Dropdown.module.css';

const Dropdown = ({ items, handleOnClick }) => {
  return (
    <ul className={style.Dropdown}>
      {items.map((item, idx) => (
        <li className={style.DropdownItem} key={idx}>
          <button onClick={handleOnClick} name={item}>
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
};

Dropdown.defaultProps = {
  handleOnClick: () => {},
};

Dropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleOnClick: PropTypes.func,
};

export default Dropdown;
