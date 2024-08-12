import { ProductCard } from "@/entities/product";
import { Product } from "@prisma/client";

export const BaseProductList = async ({
  products,
  productActionSlot,
}: {
  products: Product[];
  productActionSlot?: (product: Product) => React.ReactNode;
}) => {
  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          actionSlot={productActionSlot && productActionSlot(product)}
        />
      ))}
    </div>
  );
};
