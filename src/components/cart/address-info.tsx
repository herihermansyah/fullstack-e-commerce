import {Prisma} from "@/generated/prisma/client";
import {MapPin} from "lucide-react"; 

type AddressProps = Prisma.AddressGetPayload<{
  select: {
    id: true;
    label: true;
    fullAddress: true;
    city: true;
  };
}>;

interface AddressInfoProps {
  address: AddressProps;
}

export function AddressInfo({address}: AddressInfoProps) {
  if (!address)
    return <p className="text-destructive text-xs">Address has not been set</p>;

  return (
    <div className="space-y-2 p-3 border rounded-lg bg-slate-50">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
        <MapPin size={14} />
        Shipping Address (Default)
      </div>
      <div className="text-sm">
        <p className="font-semibold">{address.label}</p>
        <p className="text-muted-foreground">
          {address.fullAddress}, {address.city}
        </p>
      </div>
    </div>
  );
}
