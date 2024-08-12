"use server";
import { unlink } from "fs/promises";
import { productRepository, revalidateProducts } from "@/entities/product";

export const deleteProductAction = async (id: string) => {
  const product = await productRepository.findById(id);

  if (!product || !product.image) {
    throw new Error("Product not found or image does not exist");
  }

  const ImagePath = `./public/${product.image}.jpg`;

  await unlink(ImagePath).catch((error) => console.log(error));

  await productRepository.deleteProduct(id);

  revalidateProducts(product.id);
};
