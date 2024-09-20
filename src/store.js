/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.totalSum = 0;
    this.state.cntItems = 0;
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
      const updatedCart = this.state.cart.map(item =>
        item.code === code ? { ...item, quantity: item.quantity + 1 } : item,
      );
      this.setState({
        ...this.state,
        cart: updatedCart,
        totalSum: this.state.totalSum + existingItem.price,
      });
    } else {
      const item = this.state.list.find(item => item.code === code);
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...item, quantity: 1 }],
        cntItems: this.state.cntItems + 1,
        totalSum: this.state.totalSum + item.price,
      });
    }
  }

  /**
   * Удаление записи по коду из корзины
   * @param code
   */
  deleteItemFromCart(code) {
    const item = this.state.cart.find(cartItem => cartItem.code === code);
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
      totalSum: this.state.totalSum - item.price * item.quantity,
      cntItems: this.state.cntItems - 1,
    });
  }
}

export default Store;
