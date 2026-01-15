"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import { addBanks } from "@/feature/user/action";
import {addBanksSchema} from "@/feature/user/schema/userSchema";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {toast} from "sonner";
import z from "zod";

type FormError = z.inferFlattenedErrors<typeof addBanksSchema>["fieldErrors"];

function FormAddBank({id, link}: {link: string, id: string}) {
  const [error, setError] = useState<FormError | undefined>(undefined);
  const {push} = useRouter();

  const handleAddBanks = async (formData: FormData) => {
    try {
      const result = await addBanks(id, formData);
      if (result.messages) {
        setError(result.messages);
        toast.error("failed to add bank");
        return;
      }
      toast.success("successfully added bank");
      push(link);
    } catch {
      toast.error("system failure");
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Add Bank</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-2" action={handleAddBanks}>
          <Input name="bankName" type="text" placeholder="Bank Name" />
          {error?.bankName && (
            <p className="text-sm text-red-500">{error.bankName}</p>
          )}
          <Input name="cardType" type="text" placeholder="Card Type" />
          {error?.cardType && (
            <p className="text-sm text-red-500">{error.cardType}</p>
          )}
          <Input
            name="cardNumber"
            type="text"
            inputMode="numeric"
            placeholder="Card Number"
          />
          {error?.cardNumber && (
            <p className="text-sm text-red-500">{error.cardNumber}</p>
          )}
          <Input name="cardHolder" type="text" placeholder="Card Holder" />
          {error?.cardHolder && (
            <p className="text-sm text-red-500">{error.cardHolder}</p>
          )}
          <Input
            name="cardExpire"
            type="text"
            inputMode="numeric"
            placeholder="MM/YY"
            maxLength={5}
          />
          {error?.cardExpire && (
            <p className="text-sm text-red-500">{error.cardExpire}</p>
          )}
          <Input name="currency" type="text" placeholder="Currency" />
          {error?.currency && (
            <p className="text-sm text-red-500">{error.currency}</p>
          )}

          <Button type="submit">Add Bank</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default FormAddBank;
