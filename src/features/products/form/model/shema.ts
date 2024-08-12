import { z } from "zod";
import { zfd } from "zod-form-data";

const MAX_FILE_SIZE = 3_000_000;

const baseProductSchema = {
  name: zfd.text(
    z.string().min(5, { message: "Name must have 5 characters." }),
  ),
  description: zfd.text(z.string()),

  price: zfd.numeric(
    z.number().positive({ message: "Price must be a positive number." }),
  ),
  stock: zfd.numeric(
    z
      .number()
      .int()
      .nonnegative({ message: "Stock must be a non-negative integer." }),
  ),
  category: zfd.text(z.string()),
  rating: zfd.numeric(z.number().min(0).max(5)),
};

export const schema = zfd.formData({
  ...baseProductSchema,
  image: zfd.file(
    z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, { message: "File fize" }),
  ),
});

export type ProductSchema = z.infer<typeof schema>;
