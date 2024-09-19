

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи в корзину по коду
   * @param code
   */
  addToCart(code) {
    const existingItem = this.state.cart.find(cartItem => cartItem.code === code);
    if (existingItem) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(item => (item.code === code ? existingItem : item)),
      });
      existingItem.quantity += 1;
    } else {
      const item = this.state.list.find(item => item.code === code);
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...item, quantity: 1 }],
      });
    }
    console.log(this.state.cart);
  }

  /**
   * Удаление записи по коду из корзины
   * @param code
   */
  deleteItemFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
    });
  }

  /**
   * Получение общей стоимости корзины
   */
  getTotalCartPrice() {
    return this.state.cart.reduce(
      (sum, cartItem) => sum + cartItem.quantity * cartItem.price,
      0,
    );
  }
}

export default Store;
