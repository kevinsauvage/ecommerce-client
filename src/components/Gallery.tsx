"use client";

import Image from "next/image";
import { useState } from "react";
import { Image as ImageType } from "@/types";

export default function Gallery({ images }: { images: Array<ImageType> }) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="flex flex-col gap-3 items-start">
      <div className="col-span-4 w-full">
        <Image
          alt="Product Image"
          className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
          height={900}
          src={images[currentImage].url}
          width={600}
        />
      </div>
      <div className="hidden md:flex gap-1 items-start">
        {images.map((image, index) => {
          return (
            <button
              key={index}
              className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50"
              onClick={() => {
                setCurrentImage(index < images.length ? index : 0);
              }}
            >
              <Image
                alt="Preview thumbnail"
                className="aspect-square object-cover"
                height={120}
                src={image.url}
                width={100}
              />
              <span className="sr-only">View Image {index + 1}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
