import { create } from "zustand";
import { OrderItem } from "@/src/types";
import { Product } from "@prisma/client";

type Store = {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
  incrementQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
  removeItem: (id: Product["id"]) => void;
};

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {
    const { categoryId, image, ...data } = product;
    let order: OrderItem[] = get().order;
    if (order.some((item) => item.id === product.id)) {
      order = order.map((item) => {
        if (item.id === product.id) {
          const quantity = item.quantity + 1;
          return {
            ...item,
            quantity: quantity,
            subtotal: quantity * product.price,
          };
        }
        return item;
      });
    } else {
      order = [
        ...order,
        {
          ...data,
          quantity: 1,
          subtotal: 1 * product.price,
        },
      ];
    }
    set((state) => ({
      order,
    }));
  },
  incrementQuantity: (id) => {
    let order: OrderItem[] = get().order;
    order = order.map((item) => {
      if (item.id === id) {
        const quantity = item.quantity + 1;
        return {
          ...item,
          quantity: quantity,
          subtotal: quantity * item.price,
        };
      }
      return item;
    });
    set((state) => ({
      order,
    }));
  },
  decreaseQuantity: (id) => {
    let order: OrderItem[] = get().order;
    order = order.map((item) => {
      if (item.id === id) {
        const quantity = item.quantity - 1;
        if (quantity > 0) {
          return {
            ...item,
            quantity: quantity,
            subtotal: quantity * item.price,
          };
        }
      }
      return item;
    });
    set((state) => ({
      order: order.filter((item) => item.quantity > 0),
    }));
  },
  removeItem: (id) => {
    let order: OrderItem[] = get().order;
    order = order.filter((item) => item.id !== id);
    set((state) => ({
      order,
    }));
  },
}));
