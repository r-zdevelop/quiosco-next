import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
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
      <Heading>Selecciona lo que quieras</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-center">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </>
  );
}
