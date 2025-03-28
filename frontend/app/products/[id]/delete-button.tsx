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
    try {
      setError(null);
      startTransition(async () => {
        try {
          await deleteProductAction(productId);
          // La redirección la maneja el server action
        } catch (err: any) {
          setError(err.message || "Error al eliminar el producto");
        }
      });
    } catch (err: any) {
      setError(err.message || "Error al eliminar el producto");
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
