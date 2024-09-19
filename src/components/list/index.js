import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onAddToCartItem=() => {}, deleteItemFromCart=() => {}, isInCart =false}) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item
            item={item}
            isInCart={isInCart}
            onAddToCart={onAddToCartItem}
            onDeleteFromCart={deleteItemFromCart}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  isInCart:PropTypes.bool,
  onAddToCartItem: PropTypes.func,
  onSelectItem: PropTypes.func,
};

export default React.memo(List);
