import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="bg-white shadow-md flex flex-col">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative w-full h-48">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain rounded bg-gray-100"
          />
        </div>
        <p className="text-lg font-bold mt-2">${product.price}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/products/${product.id}`} className="w-full">
          <button className="bg-blue-500 hover:bg-blue-600 transition-colors text-white py-2 px-4 rounded w-full">
            View Details
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
}
