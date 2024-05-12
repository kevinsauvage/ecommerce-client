"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";

export default function Currency({ price }: { price: number | string }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return <span className="font-semibold">{formatPrice(Number(price))}</span>;
}
