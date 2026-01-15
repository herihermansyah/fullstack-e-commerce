"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {editInformation} from "@/feature/user/action";
import {editInformationSchema} from "@/feature/user/schema/userSchema";
import {Prisma} from "@/generated/prisma/client";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "sonner";
import z from "zod";

type UserSelectProps = Prisma.UserGetPayload<{
  select: {
    firstName: true;
    lastName: true;
    maidenName: true;
    birthDate: true;
    phone: true;
  };
}>;

interface EditInformation {
  user: UserSelectProps;
  id: string;
  link: string;
}

type FormError = z.inferFlattenedErrors<
  typeof editInformationSchema
>["fieldErrors"];

function EditInformation({user, id, link}: EditInformation) {
  const [error, setError] = useState<FormError | undefined>(undefined);
  const router = useRouter();

  const handleEditInformation = async (formData: FormData) => {
    try {
      const result = await editInformation(formData, id);
      if (result.messages) {
        setError(result.messages);
        toast.error("Editing failed");
        return;
      }

      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Edited successfully");
      router.push(link);
    } catch {
      setError(undefined);
      toast.error("system failure");
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Edit Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-2" action={handleEditInformation}>
          <Input
            name="firstName"
            type="text"
            max=" "
            placeholder="First Name"
            defaultValue={user.firstName ?? ""}
          />
          {error?.firstName && (
            <p className="text-sm text-red-500">{error.firstName}</p>
          )}
          <Input
            name="lastName"
            type="text"
            placeholder="Last Name"
            defaultValue={user.lastName ?? ""}
          />
          {error?.lastName && (
            <p className="text-sm text-red-500">{error.lastName}</p>
          )}
          <Input
            name="maidenName"
            type="text"
            placeholder="Maiden Name"
            defaultValue={user.maidenName ?? ""}
          />{" "}
          {error?.maidenName && (
            <p className="text-sm text-red-500">{error.maidenName}</p>
          )}
          <Input
            name="birthDate"
            type="date"
            defaultValue={
              user.birthDate
                ? new Date(user.birthDate).toISOString().split("T")[0]
                : ""
            }
          />
          {error?.birthDate && (
            <p className="text-sm text-red-500">{error.birthDate}</p>
          )}
          <Input
            name="phone"
            type="number"
            placeholder="08123.."
            defaultValue={user.phone ?? ""}
          />{" "}
          {error?.phone && (
            <p className="text-sm text-red-500">{error.phone}</p>
          )}
          <Button type="submit">Edit Information</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default EditInformation;
