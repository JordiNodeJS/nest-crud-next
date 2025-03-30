"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteProductAction } from "../actions";

interface DeleteProductButtonProps {
  productId: string;
}

export function DeleteProductButton({ productId }: DeleteProductButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (confirm("¿Está seguro que desea eliminar este producto?")) {
      try {
        setError(null);
        startTransition(async () => {
          try {
            // Llamamos a la acción del servidor y recibimos su resultado
            const result = await deleteProductAction(productId);

            // Si la operación fue exitosa, redirigimos al usuario
            if (result?.success && result?.redirectTo) {
              router.push(result.redirectTo);
              router.refresh();
            } else {
              // En caso contrario, solo actualizamos la página
              router.push("/products");
              router.refresh();
            }
          } catch (err: unknown) {
            // Manejar el error con tipado correcto
            const errorMessage =
              err instanceof Error
                ? err.message
                : "Error al eliminar el producto";
            setError(errorMessage);
          }
        });
      } catch (err: unknown) {
        // Manejar el error con tipado correcto
        const errorMessage =
          err instanceof Error ? err.message : "Error al eliminar el producto";
        setError(errorMessage);
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleDelete}
        disabled={isPending}
        variant="destructive"
        className="w-full mt-2"
      >
        {isPending ? "Eliminando..." : "Eliminar Producto"}
      </Button>

      {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
    </>
  );
}
