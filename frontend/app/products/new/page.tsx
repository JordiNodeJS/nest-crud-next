"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { createProduct } from "../product.api";
import { Product } from "@/types";

interface Props {
  params: {
    id: string;
  };
}

function ProductsNewPage() {
  const product: Product | null = null; // await getProduct(params.id);

  const { register, handleSubmit } = useForm<Product>({
    defaultValues: product || {
      name: "",
      description: "",
      price: 0,
      image: "",
    },
  });

  const onSubmit: SubmitHandler<Product> = async (data: Product) => {
    console.log(data);

    await createProduct(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-screen flex justify-center items-center"
    >
      <Card>
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Product Name</Label>
          <Input {...register("name")} />

          <Label>Description</Label>
          <Input {...register("description")} />

          <Label>Price</Label>
          <Input {...register("price")} />

          <Label>Image</Label>
          <Input {...register("image")} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Deploy</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
export default ProductsNewPage;
