import { getProduct, getProducts } from "@/actions/products";
import ProductDetails from "@/components/ProductDetails";
import ProductList from "@/components/ProductList";

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;

  const product = await getProduct(productId);

  const suggestedProducts = await getProducts({
    categoryId: product.categoryId,
  });

  return (
    <div className="bg-white">
      <div className="container">
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <ProductDetails product={product} />
          <hr className="my-10" />
          <ProductList
            products={suggestedProducts.filter(
              (product) => product.id !== productId
            )}
            title="Suggested Products"
            subtitle="You might also like these products!"
          />
        </div>
      </div>
    </div>
  );
}
