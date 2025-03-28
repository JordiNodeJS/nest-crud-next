import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Producto no encontrado
        </h1>
        <p className="text-gray-600 mb-6">
          Lo sentimos, el producto que estás buscando no existe o ha sido
          eliminado.
        </p>
        <div className="flex justify-center">
          <Link href="/products">
            <Button>Volver al catálogo de productos</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
