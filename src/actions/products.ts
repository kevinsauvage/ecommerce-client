"use server";

import { Product } from "@/types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface ProductQuery {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

export const getProducts = async (
  query?: ProductQuery
): Promise<Array<Product>> => {
  const params = new URLSearchParams();

  query &&
    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

  const products = await fetch(`${API_URL}?${params.toString()}`);
  return await products.json();
};

export const getProduct = async (id: string): Promise<Product> => {
  const product = await fetch(`${API_URL}/${id}`);
  return await product.json();
};
