import PrismaClient from "@prisma/client";
import { categories } from "./data/categories";
import { products } from "./data/products";

// Your seeding logic here
const prisma = new PrismaClient.PrismaClient();

async function main() {
  try {
    await prisma.category.createMany({
      data: categories,
    });
    await prisma.product.createMany({
      data: products,
    });
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(() => {
    console.log("Seeding complete!");
  })
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
