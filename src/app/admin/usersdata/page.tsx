import Loading from "@/components/loading-ui";
import UserList from "@/feature/user/components/table/user-list";
import React, {Suspense} from "react";

function page() {
  return (
    <Suspense fallback={<Loading />}>
      <UserList />
    </Suspense>
  );
}

export default page;
