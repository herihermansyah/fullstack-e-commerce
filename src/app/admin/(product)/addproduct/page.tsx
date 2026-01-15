import {getCategory} from "@/feature/product/action/getCategory.action";
import FormAddProduct from "@/feature/product/components/form/form-add-product";
import React from "react";

async function page() {
  const category = await getCategory();
  return (
    <div>
      <FormAddProduct category={category} />
    </div>
  );
}

export default page;
