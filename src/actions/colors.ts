"use server";

import { Color } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const routeURL = `${API_URL}/colors`;

export const getColors = async (): Promise<Array<Color>> => {
  const colors = await fetch(routeURL);
  return await colors.json();
};

export const getColor = async (id: string): Promise<Color> => {
  const color = await fetch(`${routeURL}/${id}`);
  return await color.json();
};
