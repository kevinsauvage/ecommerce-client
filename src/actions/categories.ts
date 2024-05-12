"use server";

import { Category } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const routeURL = `${API_URL}/categories`;

export const getCategories = async (): Promise<Array<Category>> => {
  const categories = await fetch(routeURL);
  return await categories.json();
};

export const getCategory = async (id: string): Promise<Category> => {
  const category = await fetch(`${routeURL}/${id}`);
  return await category.json();
};
