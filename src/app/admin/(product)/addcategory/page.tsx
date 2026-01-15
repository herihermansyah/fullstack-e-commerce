import {CategoryList} from "@/feature/product/components/category-list";
import FormAddCategory from "@/feature/product/components/form/form-add-category";
import React from "react";

function page() {
  return (
    <div className="flex flex-col gap-5">
      <FormAddCategory />
      <CategoryList />
    </div>
  );
}

export default page;
