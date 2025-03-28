"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function EditButton({ productId }: { productId: string }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/products/${productId}/edit`);
  };

  return (
    <div>
      <Button onClick={handleEdit} className="w-full">
        Editar
      </Button>
    </div>
  );
}
