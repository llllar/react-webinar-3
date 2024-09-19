import React from 'react';
import PropTypes from 'prop-types';
import { plural, getSpacesInPrice } from '../../utils';
import './style.css';

function CartInfo({ cartLen = 0, totalPrice = 0 }) {
  return (
    <div className="CartInfo">
      {!cartLen
        ? 'пусто'
        : cartLen +
          ' ' +
          plural(cartLen, { one: 'товар', few: 'товара', many: 'товаров' }) +
          ' / ' +
          getSpacesInPrice(totalPrice) +
          ' ' +
          '₽'}
    </div>
  );
}

CartInfo.propTypes = {
  cartLen: PropTypes.number,
  totalPrice: PropTypes.number,
};

export default React.memo(CartInfo);
