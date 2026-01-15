import {auth} from "@/auth";
import AllProduct from "@/components/product/all-product";
import PreviewProduct from "@/components/product/preview-product";
import {getProductById} from "@/feature/product/action/getProductById.action";
import {getRelatedProduct} from "@/feature/product/action/getRealatedProduct.action";
import React from "react";

async function page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const product = await getProductById(id);
  if (!product) {
    return (
      <div className="flex items-center justify-center mt-50">
        <p>product tidak ditemukan</p>
      </div>
    );
  }

  const relatedProduct = await getRelatedProduct(
    product.categoryId,
    product.id
  );

  if (!relatedProduct) {
    return <div>related 0</div>;
  }

  const session = await auth();
  return (
    <div className="container mx-auto">
      <PreviewProduct userId={session?.user.id} product={product} />
      <AllProduct userId={session?.user.id} products={relatedProduct} />
    </div>
  );
}

export default page;
