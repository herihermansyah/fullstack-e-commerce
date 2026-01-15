import ProductDetail from "@/feature/product/components/product-detail";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function page({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto">
      <ProductDetail id={id} />
    </div>
  );
}

export default page;