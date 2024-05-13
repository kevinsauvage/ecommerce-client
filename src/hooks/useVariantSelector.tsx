"use client";

import { Product, Variant } from "@/types";
import { useEffect, useState } from "react";

export default function useVariantSelector(
  sizes: Array<string>,
  colors: Array<string>,
  product: Product
) {
  const [selectedColor, setSelectedColor] = useState<string | null>(
    colors?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(sizes?.[0]);

  const { variants } = product || {};

  const selectedVariant: Variant | undefined = variants.find(
    (v) => v.color.value === selectedColor && v.size.name === selectedSize
  );

  const isSizeAvailable = (size: string) => {
    if (selectedColor) {
      return variants.some(
        (v) => v.size.name === size && v.color.value === selectedColor
      );
    }
    return variants.some((v) => v.size.name === size);
  };

  return {
    selectedColor,
    selectedSize,
    selectColor: setSelectedColor,
    selectSize: setSelectedSize,
    selectedVariant,
    isSizeAvailable,
  };
}
