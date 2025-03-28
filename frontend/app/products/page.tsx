import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getProducts } from "./product.api";
import { Product } from "@/types";

export default async function page() {
  const products: Product[] = await getProducts();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="bg-white shadow-md flex flex-col">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain rounded bg-gray-100"
              />
              <p className="text-lg font-bold mt-2">${product.price}</p>
            </CardContent>
            <CardFooter>
              <button className="bg-blue-500 hover:bg-blue-600 transition-colors text-white py-2 px-4 rounded w-full">
                View Details
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
