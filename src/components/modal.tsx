import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {DialogTitle} from "@radix-ui/react-dialog";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  label: string;
}

export function Modal({children, label}: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DialogTrigger>
      <DialogHeader>
        <DialogTitle></DialogTitle>
      </DialogHeader>
      <DialogContent className="max-w-[90vw] max-h-[90vh] md:max-w-[50vw] overflow-y-auto px-10">
        {children}
      </DialogContent>
    </Dialog>
  );
}
