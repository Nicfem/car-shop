import Link from "next/link";
import { Bodoni_Moda } from "next/font/google";
import clsx from "clsx";

const bodoni = Bodoni_Moda({ subsets: ["latin"] });

export const HeaderWidget = () => {
  return (
    <header className="bg-white">
      <div className="flex justify-between items-center container mx-auto px-20 py-4">
        <Link
          href={"/"}
          className={clsx(bodoni.className, "font-bold text-[35px]")}
        >
          Magazine
        </Link>
        <Link
          href={"/dashboard"}
          className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        >
          Dashboard
        </Link>
      </div>
    </header>
  );
};
