"use server";
import { writeFile } from "fs";
import { productRepository, revalidateProducts } from "@/entities/product";
import { schema } from "../model/shema";

export const createProductAction = async (data: FormData) => {
  const validateFields = schema.safeParse(data);

  if (!validateFields.success) {
    throw new Error("Validation failed");
  }

  const { image, ...productData } = validateFields.data;

  const product = await productRepository.createProduct(productData);

  const fileName = product.image;

  const buffer = await image.arrayBuffer();

  writeFile(`./public/${fileName}.jpg`, Buffer.from(buffer), (error) => {
    if (error) console.error("Error:", error);
  });

  revalidateProducts(product.id);
};
