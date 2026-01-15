import ProfileAdmin from "@/components/admin/profile-admin";
import {getUserById} from "@/feature/user/action";
import React from "react";

async function page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const result = await getUserById(id);

  if (!result) {
    return (
      <div className="flex items-center justify-center mt-50">
        <p>user not found</p>
      </div>
    );
  }
  return (
    <div>
      <ProfileAdmin user={result} />
    </div>
  );
}

export default page;
