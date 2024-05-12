"use server";

import { Size } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const routeURL = `${API_URL}/sizes`;

export const getSizes = async (): Promise<Array<Size>> => {
  const sizes = await fetch(routeURL);
  return await sizes.json();
};

export const getSize = async (id: string): Promise<Size> => {
  const size = await fetch(`${routeURL}/${id}`);
  return await size.json();
};
