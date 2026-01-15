import EditInformation from "@/components/profile/form/form-edit-information";
import { getUserIdEdit } from "@/feature/user/action";
import React from "react";

async function page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const result = await getUserIdEdit(id);

  if (!result) return null;
  return (
    <div>
      <EditInformation link={`/admin/profile/${id}/preview`} user={result} id={id} />
    </div>
  );
}

export default page;
