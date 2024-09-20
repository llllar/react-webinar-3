import React from 'react';
import PropTypes from 'prop-types';
import { getSpacesInPrice } from '../../utils';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function CartItem({ item, onDeleteFromCart = () => {} }) {
  const callbacks = {
    onDeleteFromCart: e => {
      e.stopPropagation();
      onDeleteFromCart(item.code);
    },
  };

  const cn = bem('CartItem');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{getSpacesInPrice(item.price)}&nbsp;₽</div>
      <div className={cn('quantity')}>{item.quantity}&nbsp;шт</div>
      <div className={cn('actions')}>
        <button className={cn('btn')} onClick={callbacks.onDeleteFromCart}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onDeleteFromCart: PropTypes.func,
};

export default React.memo(CartItem);
