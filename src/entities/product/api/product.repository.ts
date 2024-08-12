import { db } from "@/shared/lib";
import { Product } from "@prisma/client";
import { cache } from "react";

class ProductRepository {
  getAllProducts = cache(() => {
    return db.product.findMany();
  });

  createProduct = (
    product: Omit<Product, "id" | "image" | "createdAt" | "updatedAt">,
  ) => {
    return db.product.create({ data: product });
  };

  deleteProduct = (id: Product["id"]) => {
    return db.product.delete({
      where: { id },
    });
  };

  updateProdut = (
    id: Product["id"],
    product: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>,
  ) => {
    return db.product.update({
      where: { id },
      data: product,
    });
  };

  findById = (id: Product["id"]) => {
    return db.product.findUnique({
      where: { id },
    });
  };
}

export const productRepository = new ProductRepository();
