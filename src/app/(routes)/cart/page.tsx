import CartSummary from "./_components/CartSummary";
import CartTable from "./_components/CartTable";

export default function CartPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 h-full">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="border h-fit rounded-lg overflow-hidden lg:col-span-8">
          <CartTable />
        </div>
        <CartSummary />
      </div>
    </div>
  );
}
