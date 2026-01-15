import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {changeAvatar} from "@/feature/user/action";
import {toast} from "sonner";

export function ChangeAvatar({id}: {id: string}) {
  const handleUpdateAvatar = async (formData: FormData) => {
    try {
      const result = await changeAvatar(id, formData);
      if (result.success) {
        toast.success("Avatar updated successfully");
      } else {
        toast.error("Failed to upload avatar");
      }
    } catch {
      toast.error("system error");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant="outline">
          Change Avatar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-100">
        <form action={handleUpdateAvatar} className="flex flex-col gap-5">
          <DialogHeader>
            <DialogTitle>Edit Avatar</DialogTitle>
          </DialogHeader>
          <Input type="file" accept="image/*" name="image" />
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
