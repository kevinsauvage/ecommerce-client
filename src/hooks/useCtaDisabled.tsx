import { CartItem, Product } from "@/types";
import { useEffect, useState } from "react";

export default function useCtaDisabled(
  product: Product,
  selectedVariant: any,
  cartItems: Array<CartItem>
) {
  const [ctaDisabled, setCtaDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (product) {
      setCtaDisabled(true);
    }
  }, [product]);

  useEffect(() => {
    if (
      product.variants.length &&
      selectedVariant &&
      selectedVariant.stock >= 0
    ) {
      setCtaDisabled(false);
    }

    if (!product.variants.length && product.stock >= 0) {
      setCtaDisabled(false);
    }
  }, [selectedVariant, product.variants.length, product.stock]);

  useEffect(() => {
    if (product.variants.length && selectedVariant) {
      const cartItem = cartItems.find(
        (item) => item.selectedVariant?.id === selectedVariant.id
      );

      if (!cartItem) return;

      if (
        cartItem.quantity <=
        Number(cartItem.selectedVariant?.stock || 0) - 1
      ) {
        setCtaDisabled(false);
      } else {
        setCtaDisabled(true);
      }
    }

    if (!product.variants.length) {
      const cartItem = cartItems.find((item) => item.product.id === product.id);

      if (!cartItem) return;

      if (cartItem?.quantity <= cartItem.product.stock) {
        setCtaDisabled(false);
      } else {
        setCtaDisabled(true);
      }
    }
  }, [cartItems, product, selectedVariant]);

  return {
    ctaDisabled,
  };
}
