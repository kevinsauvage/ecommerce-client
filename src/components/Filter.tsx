"use client";
import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Filter({
  sizes,
  colors,
  className,
}: {
  sizes: Array<Size>;
  colors: Array<Color>;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSize = (size: Size) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (size.id === newSearchParams.get("sizeId")) {
      newSearchParams.delete("sizeId");
      router.push(`${pathname}?${newSearchParams.toString()}`, {
        scroll: false,
      });
      return;
    }
    newSearchParams.set("sizeId", size.id);
    router.push(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  const handleColor = (color: Color) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (color.id === newSearchParams.get("colorId")) {
      newSearchParams.delete("colorId");
      router.push(`${pathname}?${newSearchParams.toString()}`, {
        scroll: false,
      });
      return;
    }
    newSearchParams.set("colorId", color.id);
    router.push(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className={cn("bg-white dark:bg-gray-950", className)}>
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="grid gap-6">
        <div>
          <h3 className="text-base font-medium mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                onClick={() => handleSize(size)}
                key={size.id}
                className={cn(
                  " text-sm px-4 py-2 rounded-md bg-gray-100 text-gray-900 font-medium hover:[&:not(.active)]:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:[&:not(.active)]:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300",
                  searchParams.get("sizeId") === size.id
                    ? "active bg-primary text-white dark:bg-primary dark:text-white"
                    : ""
                )}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-base font-medium mb-2">Color</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                onClick={() => handleColor(color)}
                style={{
                  backgroundColor: color.value,
                }}
                key={color.id}
                className={cn(
                  "w-8 h-8 rounded-full hover:[&:not(.active)]:ring-1  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300",
                  searchParams.get("colorId") === color.id
                    ? "active ring-2 ring-primary"
                    : ""
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
