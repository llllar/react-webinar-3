import React from 'react';
import PropTypes from 'prop-types';
import { getSpacesInPrice } from '../../utils';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Item({ item, onAddToCart = () => {}, onDeleteFromCart = () => {}, isInCart = false }) {
  const callbacks = {
    onAddToCart: e => {
      e.stopPropagation();
      onAddToCart(item.code);
    },
    onDeleteFromCart: e => {
      e.stopPropagation();
      onDeleteFromCart(item.code);
    },
  };

  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{getSpacesInPrice(item.price)}&nbsp;₽</div>
      {isInCart && <div className={cn('quantity')}>{item.quantity}&nbsp;шт</div>}
      <div className={cn('actions')}>
        {!isInCart ? (
          <button className={cn('btn')} onClick={callbacks.onAddToCart}>
            Добавить
          </button>
        ) : (
          <button className={cn('btn')} onClick={callbacks.onDeleteFromCart}>
            Удалить
          </button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  isInCart: PropTypes.bool,
  onAddToCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func,
};

export default React.memo(Item);
