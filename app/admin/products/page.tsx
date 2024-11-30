import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

const DEFAULT_TAKE = 10;

// count how many products are in the database
async function countProducts() {
  const count = await prisma.product.count();
  return count;
}

async function getProducts(take: number = DEFAULT_TAKE, page: number = 1) {
  const skip = (page - 1) * 10;
  const products = await prisma.product.findMany({
    take,
    skip,
    include: {
      category: true,
    },
  });
  return products;
}

async function ProductsNewPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  if (page < 0) redirect(`/admin/products`);
  const totalProductsData = countProducts();
  const productsData = getProducts(DEFAULT_TAKE, page);
  const [totalProducts, products] = await Promise.all([
    totalProductsData,
    productsData,
  ]);
  const totalPages = Math.ceil(totalProducts / DEFAULT_TAKE);
  if (page > totalPages) redirect(`/admin/products`);
  return (
    <>
      <Heading>Administrar Productos</Heading>
      <ProductTable products={products} />
      <ProductsPagination page={page} totalPages={totalPages} />
    </>
  );
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default ProductsNewPage;
