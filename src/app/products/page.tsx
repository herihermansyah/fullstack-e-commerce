import {auth} from "@/auth";
import AllProduct from "@/components/product/all-product";
import {getProduct} from "@/feature/product/action/getProducts.action";
import React from "react";

async function page({searchParams}: {searchParams: Promise<{query?: string}>}) {
  const {query} = await searchParams;
  const result = await getProduct(query);
  const session = await auth();
  return (
    <div className="container mx-auto">
      {query && (
        <div className="mt-6 italic text-slate-500">
          Showing search results for:{" "}
          <span className="font-bold text-blue-600">{query}</span>
        </div>
      )}
      <AllProduct products={result} userId={session?.user?.id} />
    </div>
  );
}

export default page;
