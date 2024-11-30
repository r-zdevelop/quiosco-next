import Link from "next/link";

type ProductsPaginationProps = {
  page: number;
  totalPages: number;
};

function ProductsPagination({ page, totalPages }: ProductsPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav className="flex justify-center py-10">
      {page > 1 && (
        <Link
          href={`/admin/products?page=${page - 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-8"
        >
          &laquo;
        </Link>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={`/admin/products?page=${p}`}
          className={`${
            p === page ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          } px-4 py-2 text-sm ring-1 ring-inset ring-gray-300 focus:outline-offset-8`}
        >
          {p}
        </Link>
      ))}

      {page < totalPages && (
        <Link
          href={`/admin/products?page=${page + 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-8"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
export default ProductsPagination;
