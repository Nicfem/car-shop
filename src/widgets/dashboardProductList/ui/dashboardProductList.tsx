import { BaseProductList } from "@/widgets/baseProductList";
import { UpdateProductButton } from "@/features/products/updateProductButton";
import { productRepository } from "@/entities/product";
import { DeleteProductButton } from "@/features/products/deleteProductButton";

export const DashboardProductList = async () => {
  const products = await productRepository.getAllProducts();
  return (
    <BaseProductList
      products={products}
      productActionSlot={(product) => {
        return (
          <div className="flex items-end gap-2">
            <DeleteProductButton id={product.id} />
            <UpdateProductButton product={product} />
          </div>
        );
      }}
    />
  );
};
