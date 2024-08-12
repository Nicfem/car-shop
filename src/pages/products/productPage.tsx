import { CreateProdutButton } from "@/features/products/createProductButton";
import { DashboardProductList } from "@/widgets/dashboardProductList";

export const ProductsPage = () => {
  return (
    <div>
      <div className="mb-6">
        <CreateProdutButton />
      </div>
      <DashboardProductList />
    </div>
  );
};
