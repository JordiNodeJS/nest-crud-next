import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function HomePage() {
  const variant = buttonVariants({ variant: "secondary", size: "lg" });
  return (
    <>
      <header className=" flex justify-center bg-gray-200">
        <h1 className="text-7xl text-pink-700">HomePage</h1>
      </header>
      <main className="flex flex-col gap-2 items-center">
        <Link href="/products/new" className={variant}>
          Go to New Product
        </Link>
        <Button className="bg-pink-700 hover:bg-pink-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors">
          Botón
        </Button>
        <Button className="bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 ...">
          with motion (transition)
        </Button>
        <Button className="transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none ...">
          Motion reduction
        </Button>
      </main>
    </>
  );
}

export default HomePage;
