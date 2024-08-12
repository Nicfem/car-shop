import { PrismaClient, Product } from "@prisma/client";
import { promises as fs, createWriteStream } from "fs";
import axios from "axios";

const prisma = new PrismaClient();

async function main() {
  const json: string = await fs.readFile("./prisma/products.json", "utf8");
  const productsData: Product[] = JSON.parse(json);

  const products = await prisma.product.createManyAndReturn({
    data: productsData,
  });

  for (const product of products) {
    const url = "http://picsum.photos/560/640?grayscale";
    const outputPath = `./public/${product.image}.jpg`;

    downloadImage(url, outputPath);
  }
}

async function downloadImage(url: string, outputPath: string) {
  try {
    const response = await axios({
      method: "GET",
      url,
      responseType: "stream",
    });

    const writer = createWriteStream(outputPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error(error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
