"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Description,
  Field,
  Fieldset,
  Label,
  Legend,
  useClose,
} from "@headlessui/react";

import { FilePicker, Input } from "@/shared/ui";
import { createProductAction } from "../api/createProductAction";
import { updateProductAction } from "../api/updateProductAction";
import { ProductSchema, schema } from "../model/shema";

export const ProductForm = ({
  children,
  initialData,
}: {
  initialData?: Product;
  children?: React.ReactNode;
}) => {
  const { id, image, updatedAt, createdAt, ...data } = initialData || {};

  const isEditMode = !!id;

  const methods = useForm<ProductSchema>({
    defaultValues: data,
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(isEditMode);
  const close = useClose();

  const downloadFile = async (filename: string): Promise<File> => {
    const url = `/api/files/${filename}.jpg`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const file = new File([blob], filename, { type: blob.type });

    return file;
  };

  useEffect(() => {
    if (isEditMode && image) {
      downloadFile(image)
        .then((file) => {
          methods.setValue("image", file);
        })
        .finally(() => setLoading(false));
    }
  }, [isEditMode, image, methods]);

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ProductSchema> = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof ProductSchema];
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    close();

    if (isEditMode) {
      await updateProductAction(id, formData);
    } else {
      await createProductAction(formData);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <Fieldset className="space-y-2 rounded-xl bg-white p-6">
          <Legend className="font-medium">
            {isEditMode ? "Update Product" : "Create Product"}
          </Legend>
          <Field>
            <Label className="text-sm/7 font-medium">Name</Label>
            <Input name="name" />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium">Description</Label>
            <Description className="text-sm/6 text-black/50">
              Detailed description of your product.
            </Description>
            <Input name="description" />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium">Price</Label>
            <Input name="price" type="number" />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium">Stock</Label>
            <Input name="stock" type="number" />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium">Category</Label>
            <Input name="category" />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium">Rating</Label>
            <Input name="rating" type="number" />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium">Image</Label>
            {loading ? (
              <h1>Loading</h1>
            ) : (
              <FilePicker name="image" isEditMode={isEditMode} />
            )}
          </Field>

          <Button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white data-[hover]:bg-gray-700 data-[focus]:outline-1"
            disabled={loading}
          >
            {loading ? "Loading..." : isEditMode ? "Update" : "Create"}
          </Button>
          {children}
        </Fieldset>
      </form>
    </FormProvider>
  );
};
