import { Product } from "@/types";

export async function getProducts() {
  const res = await fetch("http://localhost:3100/api/products", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export async function getProduct(id: string) {
  const res = await fetch(`http://localhost:3100/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export async function createProduct(data: Product) {
  const productData = {
    ...data,
    price: parseFloat(data.price.toString()),
  };
  const res = await fetch("http://localhost:3100/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    throw new Error("Failed to create product");
  }
  return res.json();
}
