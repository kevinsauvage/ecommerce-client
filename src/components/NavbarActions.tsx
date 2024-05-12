"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import useCart from "@/hooks/useCart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NavbarActions() {
  const [isMounted, setIsMounted] = useState(false);
  const cartStore = useCart();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="ml-auto flex items-center gap-3">
      <Button
        type="button"
        variant="outline"
        className="px-1 relative"
        onClick={() => router.push("/cart")}
      >
        <ShoppingCart size={20} className="text-primary size-6" />
        <span className="sr-only">Cart</span>
        <div className="px-1 min-w-5 min-h-5 text-sm leading-tight absolute -right-2  -top-2 bg-slate-950 text-slate-50 rounded-full flex items-center justify-center aspect-square">
          {isMounted && cartStore.getTotalItems()}
        </div>
      </Button>
    </div>
  );
}
