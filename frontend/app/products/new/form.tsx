"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RefObject } from "react";
import { useForm } from "react-hook-form";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  image: string;
}

interface FormProps {
  onSubmit: (data: ProductFormData) => void;
  onCancel?: () => void;
  formRef?: RefObject<HTMLFormElement>;
}

export default function Form({ onSubmit, onCancel, formRef }: FormProps) {
  const { register, handleSubmit } = useForm<ProductFormData>();

  const handleFormSubmit = (data: ProductFormData) => {
    onSubmit(data);
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              placeholder="Name of your Product"
              {...register("name")}
            />
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Description of your Product"
              {...register("description")}
            />
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="Price of your Product"
              {...register("price")}
            />
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              placeholder="URL of product image"
              {...register("image")}
            />
          </div>
        </div>

        {/* Botones dentro del formulario */}
        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Create Product</Button>
        </div>
      </form>
    </div>
  );
}
