import { Product } from "@/types";
import Currency from "./Currency";
import { Separator } from "./ui/separator";
import ProductInfoActions from "./ProductInfoActions";

export default function ProductInfo({ product }: { product: Product }) {
  const { name, description, price, variants } = product || {};

  const colors = [...new Set(variants?.map((v) => v.color.value))];
  const sizes = [...new Set(variants?.map((v) => v.size.name))];

  return (
    <div className="grid gap-4 md:gap-10 items-start">
      <div className="grid gap-4">
        <h1 className="font-bold text-2xl lg:text-3xl">{name}</h1>
        <div>
          <p>{description}</p>
        </div>
        <div className="text-4xl font-bold">
          <Currency price={price} />
        </div>
        <Separator />
      </div>
      <ProductInfoActions product={product} colors={colors} sizes={sizes} />
    </div>
  );
}
