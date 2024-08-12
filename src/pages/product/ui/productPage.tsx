import { productRepository } from "@/entities/product";
import Image from "next/image";

export const generateStaticParams = async () => {
  const products = await productRepository.getAllProducts();
  return products.map(({ id }) => ({ id }));
};

export const ProductPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const product = await productRepository.findById(id);

  if (!product) {
    return <h1>Not found</h1>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2">
        <Image
          src={`/api/files/${product.image}.jpg`}
          priority
          quality={100}
          height={560}
          width={640}
          alt={product.name}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="md:w-1/2 md:pl-8">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-lg mb-4">{product.description}</p>
        <p className="text-xl font-semibold mb-4">Цена: {product.price}$</p>
        <p className="text-lg mb-4">Категория: {product.category}</p>
        <p className="text-lg mb-4">В наличии: {product.stock} шт.</p>
        {product.rating && (
          <p className="text-lg mb-4">Рейтинг: {product.rating} / 5</p>
        )}
      </div>
    </div>
  );
};
