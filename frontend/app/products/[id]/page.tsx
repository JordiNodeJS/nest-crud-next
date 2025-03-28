import { getProduct } from "../product.api";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteProductButton } from "./delete-button";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const product: Product | null = await getProduct(params.id);

    // Si no se encuentra el producto, mostrar una página 404
    if (!product) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link href="/products">
            <Button variant="outline" className="mb-6">
              &larr; Volver a Productos
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 grid md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-96 object-contain bg-gray-50 p-4 rounded"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="mb-6">
              <p className="text-2xl font-bold text-blue-600">
                ${product.price}
              </p>
            </div>

            <div className="space-y-4">
              <Button className="w-full">Añadir al Carrito</Button>
              <DeleteProductButton productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // Si ocurre cualquier error durante el renderizado, mostrar mensaje amigable
    console.error("Error rendering product page:", error);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-700">
            Error al cargar el producto
          </h1>
          <p className="text-gray-700 mb-4">
            Lo sentimos, ha ocurrido un error al cargar la información del
            producto.
          </p>
          <Link href="/products">
            <Button>Volver a la lista de productos</Button>
          </Link>
        </div>
      </div>
    );
  }
}
