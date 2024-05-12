import { Product } from "@/types";
import NoResults from "./NoResults";
import { ProductCard } from "./ProductCard";

export default function ProductList({
  products,
  title,
  subtitle,
}: {
  products: Array<Product>;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="mx-auto w-full">
      <header className="mb-6">
        <h2 className="text-3xl font-bold ">{title}</h2>
        {subtitle && (
          <p className="text-base mb-4 text-muted-foreground">{subtitle}</p>
        )}
      </header>
      {products?.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
