"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { EyeIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Currency from "@/components/Currency";

import usePreviewModal from "@/hooks/usePreviewModal";
import useCart from "@/hooks/useCart";

import { Product } from "@/types";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  variant?: "default" | "switchable";
  isAddedToCart?: boolean;
}

export function ProductCard({
  product,
  isAddedToCart = false,
  className,
  ...props
}: ProductCardProps) {
  const previewModal = usePreviewModal();
  const cartStore = useCart();

  const onPreview: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();
    previewModal.openModal(product);
  };

  return (
    <Card
      className={cn("size-full overflow-hidden rounded-md", className)}
      {...props}
    >
      <Link aria-label={product.name} href={`/product/${product.id}`}>
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={product.images[0]?.url ?? "/images/product-placeholder.webp"}
              alt={product.name}
              className="object-cover"
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              fill
              loading="lazy"
            />
          </AspectRatio>
        </CardHeader>
      </Link>
      <Link href={`/product/${product.id}`} tabIndex={-1}>
        <CardContent className="space-y-1.5 p-4">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            <Currency price={product.price} />
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-1">
        <div className="flex w-full items-center space-x-2">
          <Button
            aria-label="Add to cart"
            size="sm"
            className="h-8 w-full rounded-sm"
            onClick={() => cartStore.addItem(product)}
          >
            Add to cart
          </Button>
          <Button variant="outline" size="sm" onClick={onPreview}>
            <EyeIcon className="size-4" aria-hidden="true" />
            <span className="sr-only">Preview</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
