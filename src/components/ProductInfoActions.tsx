"use client";

import useCart from "@/hooks/useCart";
import { Button } from "./ui/button";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import useVariantSelector from "@/hooks/useVariantSelector";
import useCtaDisabled from "@/hooks/useCtaDisabled";

export default function ProductInfoActions({
  product,
  colors,
  sizes,
}: {
  product: Product;
  colors: Array<string>;
  sizes: Array<string>;
}) {
  const cartStore = useCart();
  const {
    selectedColor,
    selectedSize,
    selectColor,
    selectSize,
    selectedVariant,
    isSizeAvailable,
  } = useVariantSelector(sizes, colors, product);
  const { ctaDisabled } = useCtaDisabled(
    product,
    selectedVariant,
    cartStore.items
  );

  return (
    <div>
      <div className="grid gap-4 mb-10">
        {colors.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm  font-semibold">Color: </span>
            {colors?.map((color) => (
              <div
                role="button"
                key={color}
                style={{
                  backgroundColor: color,
                }}
                onClick={() => selectColor(color)}
                className={cn(
                  "w-6 h-6 rounded-full border border-gray-200 dark:border-gray-800",
                  {
                    "ring-2 ring-gray-950 dark:ring-gray-300":
                      selectedColor === color,
                  }
                )}
              />
            ))}
          </div>
        )}

        {sizes.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold mr-1">Size:</span>
            {sizes?.map((size) => (
              <Button
                key={size}
                variant="outline"
                size="sm"
                onClick={() => selectSize(size)}
                disabled={!isSizeAvailable(size)}
                className={cn({
                  "bg-primary text-white border-black border-2":
                    selectedSize === size,
                })}
              >
                {size}
              </Button>
            ))}
          </div>
        )}
      </div>

      <Button
        size="lg"
        variant="default"
        disabled={ctaDisabled}
        onClick={() => {
          !ctaDisabled && cartStore.addItem(product, selectedVariant);
        }}
      >
        Add to cart
      </Button>
    </div>
  );
}
