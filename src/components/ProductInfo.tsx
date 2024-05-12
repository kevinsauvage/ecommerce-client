"use client";

import { Product } from "@/types";
import { Button } from "./ui/button";
import Currency from "./Currency";
import { Separator } from "./ui/separator";
import useCart from "@/hooks/useCart";
import { useMemo } from "react";

export default function ProductInfo({ product }: { product: Product }) {
  const cartStore = useCart();

  const { name, description, price, variants } = product || {};

  const colors = useMemo(
    () => [...new Set(variants.map((v) => v.color.value))],
    [variants]
  );
  const sizes = useMemo(
    () => [...new Set(variants.map((v) => v.size.name))],
    [variants]
  );

  return (
    <div className="grid gap-4 md:gap-10 items-start">
      <div className="grid gap-4">
        <h1 className="font-bold text-2xl lg:text-3xl">{name}</h1>
        <div>
          <p>{description}</p>
        </div>
        <div className="text-4xl font-bold">
          <Currency price={price} />
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm  font-semibold">Color: </span>
            {colors?.map((color) => (
              <div
                key={color}
                style={{
                  backgroundColor: color,
                }}
                className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-800"
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Size:</span>
            {sizes?.map((size) => (
              <div key={size} className="text-sm">
                {size}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button
        size="lg"
        variant="default"
        onClick={() => {
          cartStore.addItem(product);
        }}
      >
        Add to cart
      </Button>
    </div>
  );
}
