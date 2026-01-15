import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {toast} from "sonner";
import {changePassword} from "@/feature/user/action";

function ChangePassword({id}: {id: string}) {
  const handleChangePassword = async (formData: FormData) => {
    try {
      const result = await changePassword(id, formData);
      if (result.success) {
        toast.success("successfully changed the password");
      } else {
        toast.error("failed to change password");
      }
    } catch {
      toast.error("system error");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant="outline">
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-100">
        <form className="flex flex-col gap-5" action={handleChangePassword}>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <Input type="text" name="oldPassword" placeholder="old password" />
          <Input type="text" name="newPassword" placeholder="new password" />
          <Input
            type="text"
            name="confirmPassword"
            placeholder="confirm password"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePassword;
