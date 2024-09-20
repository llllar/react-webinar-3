import React from 'react';
import PropTypes from 'prop-types';
import { plural, getSpacesInPrice } from '../../utils';
import './style.css';

function CartInfo({ cntItems = 0, totalPrice = 0 }) {
  return (
    <div className="CartInfo">
      {!cntItems
        ? 'пусто'
        : cntItems +
          ' ' +
          plural(cntItems, { one: 'товар', few: 'товара', many: 'товаров' }) +
          ' / ' +
          getSpacesInPrice(totalPrice) +
          ' ' +
          '₽'}
    </div>
  );
}

CartInfo.propTypes = {
  cntItems: PropTypes.number,
  totalPrice: PropTypes.number,
};

export default React.memo(CartInfo);
