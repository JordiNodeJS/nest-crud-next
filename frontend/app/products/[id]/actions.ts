"use server";

import { deleteProduct, updateProduct } from "../product.api";
import { Product } from "@/types";
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

/**
 * Server Action para actualizar un producto
 *
 * Actualiza los datos de un producto existente y revalida la caché
 */
export async function updateProductAction(product: Product) {
  try {
    // Intentar actualizar el producto
    const updatedProduct = await updateProduct(product);

    // Revalidar las rutas afectadas para refrescar la caché
    revalidatePath(`/products/${product.id}`);
    revalidatePath("/products");

    // Indicar que la operación fue exitosa
    return {
      success: true,
      product: updatedProduct,
    };
  } catch (error) {
    // Registrar el error para depuración del servidor
    console.error("Error en updateProductAction:", error);

    // Propagar un error más específico para el frontend
    throw new Error(
      `No se pudo actualizar el producto. Por favor intente nuevamente.`
    );
  }
}
