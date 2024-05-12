import { getBillboards } from "@/actions/billboards";
import { getProducts } from "@/actions/products";
import Billboard from "@/components/Billboard";
import ProductList from "@/components/ProductList";

export default async function Home() {
  const products = await getProducts({
    isFeatured: true,
  });

  const data = await getBillboards({
    isFeatured: true,
  });

  return (
    <div className="container">
      <div className="space-y-10 pb-10">
        <Billboard data={data?.[0]} />
        <div className="flex flex-col gap-8 lg-px-8">
          <ProductList
            products={products}
            title="Featured Products"
            subtitle="Check out our latest products!"
          />
        </div>
      </div>
    </div>
  );
}
