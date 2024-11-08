import { prisma } from "@/src/lib/prisma";
import CategoryIcon from "../ui/CategoryIcon";

async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

export default async function OrderSidebar() {
  const categories = await getCategories();
  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <nav className="mt-10">
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <CategoryIcon category={category} key={category.id} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
