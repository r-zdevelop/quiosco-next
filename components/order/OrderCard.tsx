import { completeOrderAction } from "@/actions/complete-order-action";
import { OrderWithProducts } from "@/src/types";
import { formatCurrency } from "@/src/utils";

type OrderCardProps = {
  order: OrderWithProducts;
};

function OrderCard({ order }: OrderCardProps) {
  async function markOrderAsCompleted() {
    const response = await fetch(`/api/orders/${order.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: true }),
    });
    if (response.ok) {
      alert("Orden marcada como completada");
    } else {
      alert("Error al marcar la orden como completada");
    }
  }
  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
    >
      <p className="text-2xl font-medium text-gray-900">
        Cliente: {order.name}
      </p>
      <p className="text-lg font-medium text-gray-900">Productos Ordenados:</p>
      <dl className="mt-6 space-y-4">
        {order.products.map((product) => (
          <div key={product.id} className="flex items-center justify-between">
            <dt className="text-base font-medium text-gray-900">
              {product.product.name} x {product.quantity}
            </dt>
            <dd className="text-base font-medium text-gray-900">
              {formatCurrency(product.product.price)}
            </dd>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">
            Total a Pagar:
          </dt>
          <dd className="text-base font-medium text-gray-900">
            {formatCurrency(order.total)}
          </dd>
        </div>
      </dl>

      <form action={completeOrderAction}>
        <input type="hidden" name="order_id" value={order.id} />
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value="Marcar Orden Completada"
        />
      </form>
    </section>
  );
}
export default OrderCard;
