"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import React, {useState, useTransition} from "react";
import z from "zod";
import {categorySchema} from "../../schema/productSchemas";
import {createCategory} from "../../action/createCategory.action";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

type FormError = z.inferFlattenedErrors<typeof categorySchema>["fieldErrors"];

function FormAddCategory() {
  const [error, setError] = useState<FormError | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const handleAddCategory = (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await createCategory(formData);
        if (result.messages) {
          setError(result.messages);
          toast.error("failed to add category");
          return;
        }
        toast.success("Category added successfully");
      } catch {
        setError(undefined);
        toast.error("system error failure");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Category</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-2" action={handleAddCategory}>
          <Input name="name" type="text" placeholder="name" />
          {error && <p className="text-sm text-red-500">{error.name}</p>}
          <Input name="slug" type="text" placeholder="slug" />
          {error && <p className="text-sm text-red-500">{error.slug}</p>}
          <Button disabled={isPending} type="submit">
            {isPending ? "loading..." : "Add Category"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default FormAddCategory;
