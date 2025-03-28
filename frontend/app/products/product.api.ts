import { Product } from "@/types";

// Configuración base para API
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100/api";

/**
 * Función para obtener todos los productos
 */
export async function getProducts() {
  try {
    // Usamos URL absoluta para asegurar compatibilidad con SSR
    const res = await fetch(`${API_BASE_URL}/products`, {
      cache: "no-store",
      // Añadimos un timeout para no bloquear la UI indefinidamente
      next: {
        revalidate: 0, // No cache
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    // Retornamos un array vacío en caso de error para evitar errores de renderizado
    return [];
  }
}

/**
 * Función para obtener un producto por ID
 */
export async function getProduct(id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      cache: "no-store",
      next: {
        revalidate: 0,
      },
    });

    if (!res.ok) {
      console.error(`Error fetching product ${id}: HTTP ${res.status}`);
      return null;
    }

    // Manejo seguro de la respuesta JSON
    try {
      const data = await res.json();
      return data;
    } catch (parseError) {
      console.error(`Error parsing JSON for product ${id}:`, parseError);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

/**
 * Función para crear un producto
 */
export async function createProduct(data: Product) {
  const productData = {
    ...data,
    price: parseFloat(data.price.toString()),
  };

  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        `Failed to create product: ${res.status} ${JSON.stringify(errorData)}`
      );
    }

    return res.json();
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

/**
 * Función para eliminar un producto
 */
export async function deleteProduct(id: string) {
  try {
    // Utilizamos una URL absoluta para asegurar compatibilidad con Server Actions
    const url = `${API_BASE_URL}/products/${id}`;

    // Configura un tiempo máximo de espera para la petición
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, {
      method: "DELETE",
      // Para Server Actions necesitamos especificar este header
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Registra información de debug pero no expone información sensible
    console.log(`Delete product response status: ${res.status} for ID: ${id}`);

    if (!res.ok) {
      const errorText = await res.text().catch(() => "No error details");
      throw new Error(`Failed to delete product: ${res.status} - ${errorText}`);
    }

    return true;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
}
