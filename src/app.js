import React, { useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalPrice = store.getState().totalSum;
  const cntItems = store.getState().cntItems;

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

  const renderItem = (item) => (
    <Item key={item.id} item={item} onAddToCart={callbacks.onAddToCartItem} /> 
  );

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart
        cart={cart}
        deleteItemFromCart={callbacks.deleteItemFromCart}
        totalPrice={totalPrice}
        cntItems={cntItems}
      />
      <List list={list} renderItem={renderItem} />
    </PageLayout>
  );
}

export default App;
