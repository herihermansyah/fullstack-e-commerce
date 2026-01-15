import {getProduct} from "../../action/getProducts.action";
import {productColumn} from "./column";
import {DataTable} from "./data-table";

export default async function ProductList() {
  const products = await getProduct();

  return (
    <main className="container mx-auto">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products List</h1>
        </div>
        <DataTable columns={productColumn} data={products} />
      </div>
    </main>
  );
}
