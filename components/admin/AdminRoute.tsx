"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AdminRoute({ link, text }: { link: string; text: string }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(link);
  return (
    <Link
      className={`${
        isActive ? "bg-amber-400" : ""
      } font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b`}
      href={link}
    >
      {text}
    </Link>
  );
}
export default AdminRoute;
