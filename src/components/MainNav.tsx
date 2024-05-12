"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Category } from "@/types";

export default function MainNav({ data }: { data: Array<Category> }) {
  const pathname = usePathname();

  const routes = data.map((category) => ({
    id: category.id,
    href: `/category/${category.id}`,
    name: category.name,
    active: pathname === `/category/${category.id}`,
  }));

  return (
    <nav className="bg-white flex items-center gap-3">
      {routes.map((category) => (
        <Link key={category.id} href={category.href}>
          {category.name}
        </Link>
      ))}
    </nav>
  );
}
