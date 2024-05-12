"use client";

import Currency from "@/components/Currency";
import NoResults from "@/components/NoResults";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import useCart from "@/hooks/useCart";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

export default function Carttable() {
  const cartStore = useCart();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartStore.items?.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              <NoResults message="Your cart is empty" />
            </TableCell>
          </TableRow>
        )}
        {cartStore.items.map(({ product, quantity }) => (
          <TableRow key={product.id}>
            <TableCell>
              <Image
                alt="Product image"
                className="aspect-square rounded-md object-cover"
                height="64"
                src={product.images[0].url}
                width="64"
              />
            </TableCell>
            <TableCell className="font-medium">Glimmer Lamps</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => cartStore.decreaseItem(product)}
                >
                  <MinusIcon className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <div>{quantity}</div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => cartStore.addItem(product)}
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Currency price={Number(product.price) * quantity} />
            </TableCell>
            <TableCell className="text-right">
              <Button
                size="icon"
                variant="outline"
                onClick={() => cartStore.removeItem(product)}
              >
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
