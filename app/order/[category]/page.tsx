import ProductCard from "@/components/products/ProductCard";
import { prisma } from "@/src/lib/prisma";

async function getProductsByCategory(category: string) {
  const products = prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });
  return products;
}

export default async function OrderPage(props: {
  params: Promise<{ category: string }>;
}) {
  const params = await props.params;
  const products = await getProductsByCategory(params.category);
  return (
    <>
      <h1 className="text-2xl my-10">Selecciona lo que quieras</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-center">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </>
  );
}
