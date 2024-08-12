"use client";
import { Dialog } from "@/shared/ui";
import { Button } from "@headlessui/react";
import { useState } from "react";
import { ProductForm } from "@/features/products/form";
import { Product } from "@prisma/client";
import { MdModeEdit } from "react-icons/md";

export const UpdateProductButton = ({ product }: { product: Product }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="flex items-center p-2 bg-sky-400 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={() => setOpen(true)}
      >
        <MdModeEdit />
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <ProductForm initialData={product} />
      </Dialog>
    </>
  );
};
