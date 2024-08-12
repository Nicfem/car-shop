"use client";
import { Button } from "@headlessui/react";
import { Product } from "@prisma/client";
import { MdDelete } from "react-icons/md";
import { deleteProductAction } from "../api/deleteProductAction";

export const DeleteProductButton = ({ id }: { id: Product["id"] }) => {
  return (
    <Button
      className="flex items-center p-2 bg-red-400 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
      onClick={() => deleteProductAction(id)}
    >
      <MdDelete />
    </Button>
  );
};
