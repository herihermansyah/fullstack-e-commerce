import FormAddBank from "@/components/profile/form/form-add-bank";
import React from "react";

async function page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  return (
    <div>
      <FormAddBank link={`/profile/${id}/preview`} id={id} />
    </div>
  );
}

export default page;
