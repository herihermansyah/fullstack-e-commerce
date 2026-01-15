import {Prisma} from "@/generated/prisma/client";

export type OrderType = Prisma.OrderGetPayload<{
  include: {
    items: true;
    user: true;
  };
}>;
