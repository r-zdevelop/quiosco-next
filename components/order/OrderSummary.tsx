"use client";
import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { useMemo } from "react";
import { formatCurrency } from "@/src/utils";

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  const total = useMemo(() => {
    return order.reduce((acc, item) => acc + item.subtotal, 0);
  }, [order]);
  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-bold">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center mt-5">No hay productos en tu pedido</p>
      ) : (
        <ul className="mt-5">
          {order.map((item, index) => (
            <ProductDetails key={index} item={item} />
          ))}
          <p className="text-2xl mt-20 text-center">
            Total a pagar: {""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>
        </ul>
      )}
    </aside>
  );
}
