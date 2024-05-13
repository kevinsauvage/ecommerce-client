import { getCategory } from "@/actions/categories";
import { getColors } from "@/actions/colors";
import { getProducts } from "@/actions/products";
import { getSizes } from "@/actions/sizes";
import Billboard from "@/components/Billboard";
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { categoryId: string; colorId: string; sizeId: string };
  searchParams: {
    colorId?: string;
    sizeId?: string;
  };
}) {
  const { categoryId } = params;
  const { colorId, sizeId } = searchParams;

  const category = await getCategory(categoryId);
  const colors = await getColors();
  const sizes = await getSizes();
  const categoryProducts = await getProducts({
    categoryId,
    colorId,
    sizeId,
  });

  return (
    <div className="bg-white">
      <div className="container mb-10">
        <Billboard data={category.billboard} />
        <div className="flex gap-8">
          <Filter colors={colors} sizes={sizes} className="mb-10 max-w-64" />
          <ProductList
            products={categoryProducts}
            title={category.name}
            subtitle={category.description}
          />
        </div>
      </div>
    </div>
  );
}
