import Loading from "@/components/loading-ui";
import ProductList from "@/feature/product/components/table/product-list";
import React, {Suspense} from "react";

function page() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductList />
    </Suspense>
  );
}

export default page;
