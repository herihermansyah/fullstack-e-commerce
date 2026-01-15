import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectReturnPolicy() {
  return (
    <Select name="returnPolicy">
      <SelectTrigger className="w-100">
        <SelectValue placeholder="Select Return Policy" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Return Policy</SelectLabel>
          <SelectItem value="No return policy">No return policy</SelectItem>
          <SelectItem value="Return within 7 Days">
            Return within 7 Days
          </SelectItem>
          <SelectItem value="Return within 15 Days">
            Return within 15 Days
          </SelectItem>
          <SelectItem value="Return within 30 Days">
            Return within 30 Days
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
