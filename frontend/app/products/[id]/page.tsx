import { getProduct } from "../product.api";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteProductButton } from "./components/delete-button";
import EditButton from "./components/edit-button";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage(props: Props) {
  try {
    // Resolving the params promise
    const params = await props.params;
    const id = params.id;

    const product: Product | null = await getProduct(id);

    if (!product) {
      return (
        <main className="container mx-auto px-4 py-12">
          <section
            className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8 text-center"
            aria-labelledby="product-not-found"
          >
            <h1
              id="product-not-found"
              className="text-3xl font-bold text-gray-800 mb-4"
            >
              Producto no encontrado
            </h1>
            <p className="text-gray-600 mb-6">
              Lo sentimos, el producto que estás buscando no existe o ha sido
              eliminado.
            </p>
            <nav className="flex justify-center">
              <Link href="/products">
                <Button>Volver al catálogo de productos</Button>
              </Link>
            </nav>
          </section>
        </main>
      );
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <nav className="mb-4" aria-label="Navegación principal">
          <Link href="/products">
            <Button variant="outline" className="mb-6">
              <span aria-hidden="true">&larr;</span> Volver a Productos
            </Button>
          </Link>
        </nav>

        <article className="bg-white rounded-lg shadow-md p-6 grid md:grid-cols-2 gap-8">
          <figure className="flex items-center justify-center relative h-[400px]">
            <Image
              src={product.image}
              alt={`Fotografía de ${product.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain bg-gray-50 p-4 rounded"
              priority
            />
          </figure>

          <section aria-labelledby="product-title">
            <header>
              <h1 id="product-title" className="text-3xl font-bold mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-6">
                {product.description || "Sin descripción"}
              </p>
            </header>

            <section aria-label="Información de precio" className="mb-6">
              <p
                className="text-2xl font-bold text-blue-600"
                aria-label={`Precio: ${product.price} dólares`}
              >
                ${product.price}
              </p>
            </section>

            <footer className="space-y-4">
              <EditButton productId={product.id} />
              <DeleteProductButton productId={product.id} />
            </footer>
          </section>
        </article>
      </main>
    );
  } catch (error) {
    console.error("Error rendering product page:", error);

    return (
      <main className="container mx-auto px-4 py-8">
        <section
          className="bg-red-50 border border-red-200 rounded-md p-6 text-center"
          aria-labelledby="error-title"
          role="alert"
        >
          <h1 id="error-title" className="text-2xl font-bold mb-4 text-red-700">
            Error al cargar el producto
          </h1>
          <p className="text-gray-700 mb-4">
            Lo sentimos, ha ocurrido un error al cargar la información del
            producto.
          </p>
          <nav>
            <Link href="/products">
              <Button>Volver a la lista de productos</Button>
            </Link>
          </nav>
        </section>
      </main>
    );
  }
}
