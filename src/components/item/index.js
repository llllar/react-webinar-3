import React from 'react';
import PropTypes from 'prop-types';
import { getSpacesInPrice } from '../../utils';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Item({ item, onAddToCart = () => {}}) {
  const callbacks = {
    onAddToCart: e => {
      e.stopPropagation();
      onAddToCart(item.code);
    },
  };

  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{getSpacesInPrice(item.price)}&nbsp;₽</div>
      <div className={cn('actions')}>
        <button className={cn('btn')} onClick={callbacks.onAddToCart}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func,
};

export default React.memo(Item);
