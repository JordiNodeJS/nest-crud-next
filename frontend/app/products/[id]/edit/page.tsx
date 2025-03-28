"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState, use, Usable } from "react";
import { getProduct } from "../../product.api";
import { updateProductAction } from "../actions";

export default function EditProduct({
  params,
}: {
  params: Usable<{ id: string }>;
}) {
  // Unwrap params Promise using React.use()
  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Product>();

  // Cargar el producto al inicio
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const productData = await getProduct(productId);

        if (!productData) {
          setError("No se pudo encontrar el producto");
          return;
        }

        // Establecer los valores en el formulario
        setValue("name", productData.name);
        setValue("description", productData.description);
        setValue("price", productData.price);
        setValue("image", productData.image);
      } catch (err) {
        setError("Error al cargar el producto");
        console.error("Error cargando producto:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, setValue]);

  const onSubmit: SubmitHandler<Product> = async (data: Product) => {
    try {
      // Aseguramos que el ID esté incluido
      const productToUpdate = {
        ...data,
        id: productId,
      };
      await updateProductAction(productToUpdate);
      router.push(`/products/${productId}`);
      router.refresh();
    } catch (err) {
      setError("Error al actualizar el producto");
      console.error("Error actualizando producto:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.back()}>Volver</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex justify-center items-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Editar Producto</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Producto</Label>
              <Input
                id="name"
                {...register("name", { required: "El nombre es obligatorio" })}
                className="w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                {...register("description")}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", {
                  required: "El precio es obligatorio",
                  min: {
                    value: 0,
                    message: "El precio no puede ser negativo",
                  },
                })}
                className="w-full"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL de la Imagen</Label>
              <Input id="image" {...register("image")} className="w-full" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
