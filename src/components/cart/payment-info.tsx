import {Prisma} from "@/generated/prisma/client";
import {CreditCard} from "lucide-react";

type PaymentProps = Prisma.PaymentMethodGetPayload<{
  select: {
    id: true;
    bankName: true;
    cardHolder: true;
    cardNumber: true;
  };
}>;

interface PaymentInfoProps {
  payment: PaymentProps;
}

export function PaymentInfo({payment}: PaymentInfoProps) {
  if (!payment)
    return (
      <p className="text-destructive text-xs">Payment method is not set yet.</p>
    );

  return (
    <div className="space-y-2 p-3 border rounded-lg bg-slate-50">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
        <CreditCard size={14} />
        Payment Method (Default)
      </div>
      <div className="text-sm">
        <p className="font-semibold">{payment.bankName}</p>
        <p className="text-muted-foreground">
          {payment.cardHolder} a/n {payment.cardNumber}
        </p>
      </div>
    </div>
  );
}
