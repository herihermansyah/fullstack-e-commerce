"use client";

import {ColumnDef} from "@tanstack/react-table";
import {UserType} from "../../types/user.type";
import {SwitchRole} from "../switch-role";
import {SwitchStatus} from "@/components/switch-status";
import {setUserStatus} from "../../action";

export const userColumn: ColumnDef<UserType>[] = [
  {
    id: "no",
    header: "No",
    cell: ({row}) => <span className="text-slate-500">{row.index + 1}</span>,
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({row}) => (
      <span className="font-semibold text-slate-700">
        {row.original.username || row.original.name || "-"}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "role",
    header: "Role",
    cell: ({row}) => {
      const {id, role} = row.original;
      return <SwitchRole userId={id} role={role ?? "ADMIN"} />;
    },
  },
  {
    id: "status",
    header: "Account Status",
    cell: ({row}) => {
      const {id, isActive, email} = row.original;
      return (
        <SwitchStatus
          id={id}
          isStatus={isActive}
          labelName={email ?? ""}
          action={() => setUserStatus(id, isActive)}
        />
      );
    },
  },
];
