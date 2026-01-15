import {getOrders} from "../../action/getOrder.action";
import {productColumn} from "./column";
import {DataTable} from "./data-table";

export default async function OrderList() {
  const result = await getOrders();

  return (
    <main className="container mx-auto">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders List</h1>
        </div>
        <DataTable columns={productColumn} data={result} />
      </div>
    </main>
  );
}
