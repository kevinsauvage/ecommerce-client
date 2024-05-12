export interface billboard {
  id: number;
  label: string;
  description: string;
  imageURL: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  billboardId: string;
  billboard: billboard;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  category: Category;
  description: string;
  categoryId: string;
  isFeatured: boolean;
  images: Array<Image>;
  variants: Array<{
    id: string;
    color: Color;
    size: Size;
    stock: number;
  }>;
}

export interface Image {
  id: string;
  url: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}
