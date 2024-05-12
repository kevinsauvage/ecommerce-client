import { getCategories } from "@/actions/categories";
import MainNav from "./MainNav";
import Link from "next/link";
import NavbarActions from "./NavbarActions";

export default async function Header() {
  const categories = await getCategories();

  return (
    <div className="bg-white border-b ">
      <div className="container flex items-center gap-3 py-4">
        <Link href="/" className="font-bold text-xl">
          Store
        </Link>
        <MainNav data={categories} />
        <NavbarActions />
      </div>
    </div>
  );
}
