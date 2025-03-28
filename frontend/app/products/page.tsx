import { getProducts } from "./product.api";
import { Product } from "@/types";
import { ProductCard } from "./product-card";

export default async function page() {
  const products: Product[] = await getProducts();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
