import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const revalidateProducts = async (id: Product["id"]) => {
  revalidatePath("/");
  revalidatePath("/dashboard/products");
  revalidatePath(`/product/${id}`);
};
