"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Currency from "@/components/Currency";
import useCart from "@/hooks/useCart";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function CartSummary() {
  const items = useCart((state) => state.items);
  const searchParams = useSearchParams();
  const clearCart = useCart((state) => state.clearCart);
  const getTotalPrice = useCart((state) => state.getTotalPrice);

  useEffect(() => {
    const success = searchParams.get("success");
    if (success) {
      toast.success("Order placed successfully");
      clearCart();
      return;
    }

    const canceled = searchParams.get("canceled");
    if (canceled) {
      toast.error("Order canceled, please try again.");
      return;
    }
  }, [clearCart, searchParams]);

  const onCheckout = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout?redirectUrl=${window.location.origin}`,
      {
        method: "POST",
        body: JSON.stringify({
          cartProducts: items.map((item) => ({
            id: item.product.id,
            quantity: item.quantity,
          })),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return toast.error("Failed to checkout");
    }

    const data = await response.json();
    window.location = data.checkoutUrl;
  };

  return (
    <div className="border rounded-lg p-6 flex flex-col gap-4 lg:col-span-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Order Summary</h2>
        <div className="text-2xl font-bold">
          <Currency price={getTotalPrice()} />
        </div>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <span>Subtotal</span>
        <span>
          <Currency price={getTotalPrice()} />
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span>Discount</span>
        <span className="text-green-500">-$00.00</span>
      </div>
      <Separator />
      <div className="flex items-center justify-between font-bold">
        <span>Total</span>
        <span>
          <Currency price={getTotalPrice()} />
        </span>
      </div>
      <Button size="lg" onClick={onCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
}
