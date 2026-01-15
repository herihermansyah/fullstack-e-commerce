import EditInformation from "@/components/profile/form/form-edit-information";
import { getUserIdEdit } from "@/feature/user/action";
import React from "react";

export const dynamic = "force-dynamic";

async function page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const result = await getUserIdEdit(id);
  console.log(result);

  if (!result) return null;
  return (
    <div>
      <EditInformation link={`/profile/${id}/preview`} user={result} id={id} />
    </div>
  );
}

export default page;
