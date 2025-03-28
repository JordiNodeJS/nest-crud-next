"use server";

import { deleteProduct } from "../product.api";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Server Action para eliminar un producto
 *
 * Implementa manejo de errores mejorado y revalidación de caché
 */
export async function deleteProductAction(productId: string) {
  try {
    // Intenta eliminar el producto
    await deleteProduct(productId);

    // Revalida la ruta de productos para refrescar la caché
    revalidatePath("/products");

    // Indicamos que la operación fue exitosa
    return { success: true, redirectTo: "/products" };
  } catch (error) {
    // Registra el error para depuración del servidor
    console.error("Error en deleteProductAction:", error);

    // Propaga un error más específico para el frontend
    throw new Error(
      `No se pudo eliminar el producto. Por favor intente nuevamente.`
    );
  }
}
