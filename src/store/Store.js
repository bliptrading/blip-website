import { create } from "zustand";
import { persist } from "zustand/middleware";

const Store = create(
  persist(
    (set) => ({
      cart: 0,
      isLoggedIn: false,
      setIsLoggedIn: (val) => set(() => ({ isLoggedIn: val })),
      cartArray: [],
      addToCart: (item) =>
        set((state) => ({ cartArray: [...state.cartArray, item] })),
      clearCart: () => set({ cart: 0, cartArray: [] }),
      incrementCart: () => set((state) => ({ cart: state.cart + 1 })),
      removeFromCart: (itemId) =>
        set((state) => ({
          cartArray: state.cartArray.filter((item) => item.id !== itemId),
        })),
    }),
    { name: "store" }
  )
);

export default Store;
