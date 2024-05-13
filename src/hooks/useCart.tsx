import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { CartItem, Product, Variant } from "@/types";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

interface CartStore {
  items: Array<CartItem>;
  addItem: (item: Product, selectedVariant?: Variant) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  decreaseItem: (id: string) => void;
  isQuantityIncreaseDisabledForVariant: (variant: Variant) => boolean;
  isQuantityIncreaseDisabledForProduct: (product: Product) => boolean;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (item, selectedVariant) => {
        const exist = get().items.find(
          (i) =>
            i.product?.id === item.id &&
            i.selectedVariant?.id === selectedVariant?.id
        );

        if (exist) {
          set((state) => ({
            items: state.items.map((i) =>
              i.product.id === item.id &&
              i.selectedVariant?.id === selectedVariant?.id
                ? { ...i, quantity: i.quantity + 1, selectedVariant }
                : i
            ),
          }));
          toast.success("Item quantity increased");
          return;
        }

        set((state) => ({
          items: [
            ...state.items,
            {
              id: uuidv4(),
              product: item,
              quantity: 1,
              selectedVariant,
            },
          ],
        }));

        toast.success("Item added to cart");
      },

      decreaseItem: (id) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          ),
        }));
        toast.success("quantity correctly decreased");
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
        toast.success("Item removed from cart");
      },
      clearCart: () => set({ items: [] }),
      getTotalPrice: () =>
        get().items.reduce(
          (acc, item) => acc + Number(item.product.price) * item.quantity,
          0
        ),
      getTotalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      isQuantityIncreaseDisabledForVariant: (variant) => {
        if (variant?.stock <= 0) return true;

        const cartItem = get().items.find(
          (item) => item.selectedVariant?.id === variant.id
        );

        return (
          (cartItem &&
            cartItem.quantity >=
              Number(cartItem?.selectedVariant?.stock || 0) - 1) ||
          false
        );
      },

      isQuantityIncreaseDisabledForProduct: (product) => {
        if (product.stock <= 0) return true;

        const cartItem = get().items.find(
          (item) => item.product.id === product.id
        );

        return (
          (cartItem && cartItem.quantity >= cartItem.product.stock) || false
        );
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
