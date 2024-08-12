import { productRepository } from "@/entities/product";
import { BaseProductList } from "@/widgets/baseProductList";

export const HomePage = async () => {
  const products = await productRepository.getAllProducts();

  return (
    <div>
      <BaseProductList products={products} />
    </div>
  );
};
