import React, { useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalPrice = store.getTotalCartPrice();

  const callbacks = {
    onAddToCartItem: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),

    deleteItemFromCart: useCallback(
      code => {
        store.deleteItemFromCart(code);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart cart={cart} deleteItemFromCart={callbacks.deleteItemFromCart} totalPrice={totalPrice} />
      <List list={list} isInCart={false} onAddToCartItem={callbacks.onAddToCartItem} />
    </PageLayout>
  );
}

export default App;
