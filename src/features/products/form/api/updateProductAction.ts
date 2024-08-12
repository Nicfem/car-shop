"use server";
import { writeFile, unlink } from "fs/promises";
import { v4 as uuid } from "uuid";
import { productRepository, revalidateProducts } from "@/entities/product";
import { schema } from "../model/shema";

export const updateProductAction = async (id: string, data: FormData) => {
  const validateFields = schema.safeParse(data);

  if (!validateFields.success) {
    throw new Error("Validation failed");
  }

  const product = await productRepository.findById(id);

  if (!product || !product.image) {
    throw new Error("Product not found or image does not exist");
  }

  const oldImagePath = `./public/${product.image}.jpg`;

  await unlink(oldImagePath).catch((error) => console.log(error));

  const { image, ...productData } = validateFields.data;

  const newImageName = uuid();

  await productRepository.updateProdut(id, {
    ...productData,
    image: newImageName,
  });

  const buffer = await image.arrayBuffer();

  await writeFile(`./public/${newImageName}.jpg`, Buffer.from(buffer)).catch(
    (error) => console.log(error),
  );

  revalidateProducts(product.id);
};
