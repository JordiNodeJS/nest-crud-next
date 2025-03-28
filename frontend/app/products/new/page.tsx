"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form from "./form";

export default function CardWithForm() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      console.log("Submitting data:", data);
      // Aquí puedes implementar la lógica para enviar los datos al backend
      // Por ejemplo:
      // await fetch('/api/products', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      // Redireccionar a la página de productos después de crear
      router.push("/products");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    router.back(); // Volver a la página anterior
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create a Product</CardTitle>
        <CardDescription>Creante a product for you shop.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleSubmit} onCancel={handleCancel} />
      </CardContent>
    </Card>
  );
}
