"use client";
import usePreviewModal from "@/hooks/usePreviewModal";
import Modal from "../Modal";
import ProductInfo from "../ProductInfo";
import { Product } from "@/types";
import Gallery from "../Gallery";

export default function PreviewModal() {
  const previewModal = usePreviewModal();
  const product = previewModal.data as Product;

  if (!product) return null;
  return (
    <Modal open={previewModal.isOpen} close={previewModal.closeModal}>
      <div className="grid w-full grid-cols-1 items-start gap-x6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="col-span-4 lg:col-span-6">
          <Gallery images={product.images} />
        </div>
        <div className="col-span-8 lg:col-span-6">
          <ProductInfo product={product} />
        </div>
      </div>
    </Modal>
  );
}
