import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function add(product) {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...current, { ...product, qty: 1 }];
    });
  }

  function remove(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function changeQty(id, delta) {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== id) return item;
        const qty = item.qty + delta;
        return qty <= 0 ? item : { ...item, qty };
      })
    );
  }

  function clear() {
    setItems([]);
  }

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const value = { items, add, remove, changeQty, clear, total };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}
