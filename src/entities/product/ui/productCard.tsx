import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export const ProductCard = ({
  product,
  actionSlot,
}: {
  product: Product;
  actionSlot?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center">
      <Link className="w-full h-full block" href={`/product/${product.id}`}>
        <Image
          width={280}
          height={320}
          alt={product.name}
          src={`/api/files/${product.image}.jpg`}
          className="rounded-xl h-full w-full hover:opacity-90 object-cover object-center"
        />
      </Link>
      <div className="mt-2 w-full flex justify-between">
        <Link href={`/product/${product.id}`}>
          <div className="mt-4 w-full flex flex-col items-start">
            <h2 className="text-md text-gray-700">{product.name}</h2>
            <p className="mt-1 text-lg font-medium text-gray-900">
              ${product.price}
            </p>
          </div>
        </Link>
        {actionSlot}
      </div>
    </div>
  );
};
