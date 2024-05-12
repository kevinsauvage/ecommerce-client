import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";
import toast from "react-hot-toast";

interface CartStore {
  items: Array<{
    product: Product;
    quantity: number;
  }>;
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  decreaseItem: (item: Product) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const exist = get().items.find((i) => i.product?.id === item.id);

        if (exist) {
          set((state) => ({
            items: state.items.map((i) =>
              i.product.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }));
          toast.success("Item quantity increased");
          return;
        }

        set((state) => ({
          items: [
            ...state.items,
            {
              product: item,
              quantity: 1,
            },
          ],
        }));

        toast.success("Item added to cart");
      },

      decreaseItem: (item) => {
        const exist = get().items.find((i) => i.product?.id === item.id);

        if (exist?.quantity === 1) {
          set((state) => ({
            items: state.items.filter((i) => i.product.id !== item.id),
          }));
        } else {
          set((state) => ({
            items: state.items.map((i) =>
              i.product.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
            ),
          }));
        }
        toast.success("quantity correctly decreased");
      },
      removeItem: (item) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== item.id),
        }));
        toast.success("Item removed from cart");
      },
      clearCart: () => set({ items: [] }),
      getTotalPrice: () =>
        get().items.reduce((acc, item) => acc + Number(item.product.price), 0),
      getTotalItems: () => get().items.length,
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
