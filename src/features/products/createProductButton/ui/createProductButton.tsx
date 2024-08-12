"use client";
import { useState } from "react";
import { Dialog } from "@/shared/ui";
import { Button } from "@headlessui/react";
import { ProductForm } from "@/features/products/form";
import { MdFormatListBulletedAdd } from "react-icons/md";

export const CreateProdutButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="flex items-center px-4 py-2 bg-lime-500 text-white rounded-lg shadow-md hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-opacity-75"
        onClick={() => setOpen(true)}
      >
        <MdFormatListBulletedAdd />
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <ProductForm />
      </Dialog>
    </>
  );
};
