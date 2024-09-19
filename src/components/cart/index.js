import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Modal from '../modal';
import CartInfo from '../cart-info';
import List from '../list';

function Cart({ cart = [], totalPrice = 0, deleteItemFromCart = () => {} }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const cn = bem('Cart');
  return (
    <div className={cn()}>
      <div className={cn('label')}>В корзине:</div>
      <CartInfo cartLen={cart.length} totalPrice={totalPrice} />
      <div className={cn('actions')}>
        <button className={cn('open')} onClick={openModal}>
          Перейти
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={'Корзина'}>
        {!cart.length ? (
          <center className={cn('empty')}>Корзина пуста</center>
        ) : (
          <div className={cn('list')}>
            <List isInCart={true} list={cart} deleteItemFromCart={deleteItemFromCart} />
            <div className={cn('total')}>
              <strong>Итого</strong>
              <strong>{totalPrice} ₽</strong>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array,
  totalPrice: PropTypes.number,
  deleteItemFromCart: PropTypes.func,
};

export default React.memo(Cart);
