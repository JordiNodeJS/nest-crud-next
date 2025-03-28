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
    console.log(`Fetching product with ID: ${id}`);

    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    console.log(
      `Response status: ${res.status}, Content-Length: ${res.headers.get(
        "content-length"
      )}`
    );

    if (!res.ok) {
      console.error(`Error HTTP: ${res.status} al obtener producto ${id}`);
      return null;
    }

    // Detectamos explícitamente contenido vacío mediante el header Content-Length
    if (res.headers.get("content-length") === "0") {
      console.warn(`Producto ${id} no encontrado (respuesta vacía)`);
      return null;
    }

    // Para evitar problemas de JSON vacío o inválido
    const responseText = await res.text();

    if (!responseText || responseText.trim() === "") {
      console.warn(`Producto ${id} respuesta vacía`);
      return null;
    }

    try {
      // Parseamos el JSON con manejo de errores
      return JSON.parse(responseText);
    } catch (parseError) {
      console.error(`Error parseando JSON para producto ${id}:`, parseError);
      console.error(`JSON inválido: ${responseText.substring(0, 100)}`);
      return null;
    }
  } catch (error) {
    console.error(`Error al obtener el producto ${id}:`, error);
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

    return await res.json();
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
}
