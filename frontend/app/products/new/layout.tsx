import type { ReactNode } from "react";

export default function NewProductLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Product</h1>
        <p className="text-gray-600">Add a new product to the catalog</p>
      </div>
      <article className="flex justify-center bg-stone-300/20 shadow-sm rounded-lg p-6">
        {children}
      </article>
    </div>
  );
}
