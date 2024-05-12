"use client";

import { Product } from "@/types";
import Gallery from "./Gallery";
import ProductInfo from "./ProductInfo";

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl mx-auto">
      <Gallery images={product.images} />
      <ProductInfo product={product} />
    </div>
  );
}
