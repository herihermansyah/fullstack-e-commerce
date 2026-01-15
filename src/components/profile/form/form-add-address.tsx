"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {addAddress} from "@/feature/user/action";
import {addAddressSchema} from "@/feature/user/schema/userSchema";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {toast} from "sonner";
import z from "zod";

type FormError = z.inferFlattenedErrors<typeof addAddressSchema>["fieldErrors"];

function FormAddAddress({id, link}: {link: string; id: string}) {
  const [error, setError] = useState<FormError | undefined>(undefined);

  const {push} = useRouter();

  const handleAddAddress = async (formData: FormData) => {
    try {
      const result = await addAddress(id, formData);

      if (result.messages) {
        setError(result.messages);
        toast.error("Address failed to add");
        return;
      }

      toast.success("Address added successfully");
      push(link);
    } catch {
      toast.error("System failure");
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Add Address</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-2" action={handleAddAddress}>
          <Input name="label" type="text" placeholder="Label" />
          {error?.label && (
            <p className="text-sm text-red-500">{error.label}</p>
          )}
          <Input name="fullAddress" type="text" placeholder="Full Address" />
          {error?.fullAddress && (
            <p className="text-sm text-red-500">{error.fullAddress}</p>
          )}
          <Input name="city" type="text" placeholder="City" />{" "}
          {error?.city && <p className="text-sm text-red-500">{error.city}</p>}
          <Input
            name="postalCode"
            type="text"
            inputMode="numeric"
            placeholder="Postal Code"
          />{" "}
          {error?.postalCode && (
            <p className="text-sm text-red-500">{error.postalCode}</p>
          )}
          <Input name="province" type="text" placeholder="Province" />{" "}
          {error?.province && (
            <p className="text-sm text-red-500">{error.province}</p>
          )}
          <Button type="submit">Add address</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default FormAddAddress;
