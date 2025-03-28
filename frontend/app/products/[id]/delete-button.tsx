"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteProductAction } from "./actions";

interface DeleteProductButtonProps {
  productId: string;
}

export function DeleteProductButton({ productId }: DeleteProductButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = React.useState<string | null>(null);

  const handleDelete = async () => {
    if (confirm("¿Está seguro que desea eliminar este producto?")) {
      try {
        setError(null);
        startTransition(async () => {
          try {
            // La acción del servidor maneja la redirección
            await deleteProductAction(productId);

            // Como respaldo, si por alguna razón la redirección del server action no funciona,
            // hacemos una redirección desde el cliente también
            router.push("/products");
            router.refresh();
          } catch (err: any) {
            setError(err.message || "Error al eliminar el producto");
          }
        });
      } catch (err: any) {
        setError(err.message || "Error al eliminar el producto");
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
