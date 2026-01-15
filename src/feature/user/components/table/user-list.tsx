import {getUser} from "../../action/user/getUser.action";
import {userColumn} from "./column";
import {DataTable} from "./data-table";

export default async function UserList() {
  const user = await getUser();

  return (
    <main className="container mx-auto">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User List</h1>
        </div>
        <DataTable columns={userColumn} data={user} />
      </div>
    </main>
  );
}
