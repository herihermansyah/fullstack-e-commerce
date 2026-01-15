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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {toast} from "sonner";
import {Gender} from "@/generated/prisma/enums";
import {changeGender} from "@/feature/user/action";

interface ChangeGenderProps {
  id: string;
  gender: string;
}

export function ChangeGender({id, gender}: ChangeGenderProps) {
  const handleChangeGender = async (formData: FormData) => {
    const gender = formData.get("gender") as Gender;
    try {
      await changeGender(id, gender);
      toast.success("successfully changed gender");
    } catch {
      toast.error("system error");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant="outline">
          Change Gender
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-100">
        <form className="flex flex-col gap-5" action={handleChangeGender}>
          <div className="flex flex-col gap-5">
            <DialogHeader>
              <DialogTitle>Edit Gender</DialogTitle>
            </DialogHeader>
            <Select name="gender">
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>SELECT GENDER</SelectLabel>
                  <SelectItem value="OTHER">OTHER</SelectItem>
                  <SelectItem value="MALE">MALE</SelectItem>
                  <SelectItem value="FEMALE">FEMALE</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold capitalize">result</span>
            <span className="px-1 border bg-gray-100">{gender}</span>
          </div>
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
