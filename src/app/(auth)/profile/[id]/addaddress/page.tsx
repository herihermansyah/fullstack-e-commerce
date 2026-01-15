import FormAddAddress from "@/components/profile/form/form-add-address";
import React from "react";

async function page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  return (
    <div>
      <FormAddAddress link={`/profile/${id}/preview`} id={id} />
    </div>
  );
}

export default page;
