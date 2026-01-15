"use client";

import React, { useState } from "react"; 
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react"; 
import { useRouter } from "next/navigation";
import { OrderStatus } from "@/generated/prisma/enums";
import { changeStatusOrder } from "@/feature/orders/action/changeStatusOrder.action";

interface ChangeStatusProps { 
  id: string;
  status: string;
}

export function ChangeStatus({ id, status: currentStatus }: ChangeStatusProps) {
  const [open, setOpen] = useState(false); 
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter();

  const handleUpdateStatus = async (formData: FormData) => {
    const newStatus = formData.get("orderStatus") as OrderStatus;
    
    if (newStatus === currentStatus) {
      setOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const result = await changeStatusOrder(id, newStatus);
      
      if (result.success) {
        toast.success("Successfully changed status");
        setOpen(false); 
        router.refresh(); 
      } else {
        toast.error("Failed to change status");
      }
    } catch {
      toast.error("System error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant="outline">
          Change status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-100">
        <form action={handleUpdateStatus} className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-500">Current Status</span>
              <span className="px-3 py-1 border bg-slate-50 rounded-md w-fit font-bold">
                {currentStatus}
              </span>
            </div>

            <Select name="orderStatus" defaultValue={currentStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select New Status</SelectLabel>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="PAID">PAID</SelectItem>
                  <SelectItem value="SHIPPED">SHIPPED</SelectItem>
                  <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                  <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}