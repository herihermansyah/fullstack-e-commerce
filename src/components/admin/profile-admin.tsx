"use client";

import React from "react";
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "../ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {Badge} from "../ui/badge";
import {
  CalendarDays,
  Mail,
  User,
  MapPin,
  CreditCard,
  MapPinOff,
  Landmark,
} from "lucide-react";
import {format} from "date-fns";
import {Button} from "../ui/button";
import {Prisma} from "@/generated/prisma/client";
import {useRouter} from "next/navigation";
import {DeleteData} from "../profile/delete-data";
import {ChangeGender} from "../profile/change-gender";
import ChangePassword from "../profile/change-password";
import SwitchPrimary from "../profile/switch-primary-bank";
import {
  deleteAddress,
  deleteBank,
  setPrimaryAddress,
  setPrimaryBank,
} from "@/feature/user/action";
import {Modal} from "../modal";
import {ChangeAvatar} from "../profile/change-avatar";

type UserTypeProps = Prisma.UserGetPayload<{
  include: {
    addresses: true;
    payment_methods: true;
  };
}>;

interface ProfileAdminProps {
  user: UserTypeProps;
}

function ProfileAdmin({user}: ProfileAdminProps) {
  const formatDate = (date: Date | null | undefined) =>
    date ? format(new Date(date), "dd MMM yyyy") : "-";

  const router = useRouter();

  return (
    <div className="space-y-6 pb-10">
      {/* 1. HEADER SECTION: Profile Summary */}
      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="h-24 w-24 border-4 border-white shadow-sm">
            <AvatarImage
              src={user.image || ""}
              className="object-cover"
              alt={user.name || ""}
            />
            <AvatarFallback className="text-2xl font-bold bg-indigo-100 text-indigo-700">
              {user.name?.substring(0, 2).toUpperCase() || "CN"}
            </AvatarFallback>
          </Avatar>
          <ChangeAvatar id={user.id} />
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              {user.firstName} {user.lastName}
            </h2>
            <Badge
              variant={user.role === "ADMIN" ? "default" : "secondary"}
              className="font-bold"
            >
              {user.role}
            </Badge>
            {!user.isActive && <Badge variant="destructive">BANNED</Badge>}
          </div>
          <div className="flex items-center gap-5">
            <p className="text-slate-500 font-medium italic">
              {user.email || "no-username"}
            </p>
            <div>
              <ChangePassword id={user.id} />
            </div>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2 text-sm text-slate-600">
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4" /> {user.email}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" /> Joined{" "}
              {formatDate(user.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. PERSONAL INFORMATION */}
        <Card className="shadow-sm">
          <CardHeader className="flex justify-between flex-row items-center gap-2 space-y-0 border-b mb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-indigo-600" />
              Personal Information
            </CardTitle>
            <CardAction>
              <Button
                onClick={() =>
                  router.push(`/admin/profile/${user.id}/editinformation`)
                }
                size={"sm"}
              >
                Edit Information
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm">
            <div className="grid grid-cols-2 border-b pb-2">
              <span className="text-slate-500">First Name</span>
              <span className="font-semibold text-right capitalize">
                {user.firstName}
              </span>
            </div>
            <div className="grid grid-cols-2 border-b pb-2">
              <span className="text-slate-500">Last Name</span>
              <span className="font-semibold text-right capitalize">
                {user.lastName}
              </span>
            </div>
            <div className="grid grid-cols-2 border-b pb-2">
              <span className="text-slate-500">Full Name</span>
              <span className="font-semibold text-right capitalize">
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-slate-500">Gender</span>
              <div className="flex items-center gap-5">
                <span className="font-semibold text-right capitalize">
                  {user.gender?.toLowerCase()}
                </span>
                <ChangeGender gender={user.gender ?? ""} id={user.id} />
              </div>
            </div>
            <div className="grid grid-cols-2 border-b pb-2">
              <span className="text-slate-500">Birth Date</span>
              <span className="font-semibold text-right">
                {formatDate(user.birthDate)}
              </span>
            </div>
            <div className="grid grid-cols-2 border-b pb-2">
              <span className="text-slate-500">Phone Number</span>
              <span className="font-semibold text-right">
                {user.phone || "-"}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-slate-500">Maiden Name</span>
              <span className="font-semibold text-right">
                {user.maidenName || "-"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 3. PRIMARY ADDRESS */}
        <div className="flex flex-col gap-5">
          <Card className="shadow-sm">
            <CardHeader className="flex justify-between flex-row items-center gap-2 space-y-0 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-indigo-600" />
                Address
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                  Main Address
                </h3>
                {user.addresses.some((item) => item.isPrimary) && (
                  <span className="flex items-center gap-1 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    ACTIVE
                  </span>
                )}
              </div>

              {user.addresses.filter((item) => item.isPrimary).length > 0 ? (
                user.addresses
                  .filter((item) => item.isPrimary)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-linear-to-b from-white to-slate-50 p-4 transition-all hover:shadow-md hover:border-blue-200"
                    >
                      <div className="absolute right-5 top-5 opacity-5 transition-transform group-hover:scale-110">
                        <MapPin size={34} />
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="mt-1 rounded-lg bg-blue-100 p-2 text-blue-600">
                          <MapPin size={18} />
                        </div>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-slate-800 leading-none">
                              {item.city}
                            </p>
                            <span className="text-[10px] text-blue-600 font-black uppercase tracking-tighter">
                              Primary
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 leading-relaxed max-w-70">
                            {item.fullAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-8 px-4 text-center">
                  <div className="rounded-full bg-slate-50 p-3 mb-2">
                    <MapPinOff className="text-slate-300" size={24} />
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    There is no main address
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Set one of your addresses as primary
                  </p>
                </div>
              )}

              <Modal label="Managed All Addresses">
                <Button
                  onClick={() => router.push(`/profile/${user.id}/addaddress`)}
                  className="w-full mb-4 bg-indigo-600 hover:bg-indigo-700"
                >
                  + Add New Address
                </Button>
                <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[60vh]">
                  {user.addresses.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">Address #{idx + 1}</Badge>
                        <SwitchPrimary
                          labelName="addres"
                          id={item.id}
                          isPrimary={item.isPrimary}
                          action={() => setPrimaryAddress(item.id, item.userId)}
                        />
                      </div>
                      <p className="font-bold text-slate-800">
                        {item.fullAddress}
                      </p>
                      <p className="text-sm text-slate-500">
                        {item.city}, {item.postalCode}
                      </p>
                      <DeleteData
                        id={item.id}
                        label={item.fullAddress ?? ""}
                        onDelete={deleteAddress}
                      />
                    </div>
                  ))}
                </div>
              </Modal>
            </CardContent>
          </Card>

          {/* 4. PAYMENT METHODS */}
          <Card className="shadow-sm md:col-span-2">
            <CardHeader className="flex justify-between flex-row items-center gap-2 space-y-0 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-indigo-600" />
                Payment Methods & Banking
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                  Primary Payment Method
                </h3>
                {user.payment_methods.some((item) => item.isDefault) && (
                  <span className="flex items-center gap-1 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    ACTIVE
                  </span>
                )}
              </div>

              {user.payment_methods.filter((item) => item.isDefault).length >
              0 ? (
                user.payment_methods
                  .filter((item) => item.isDefault)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border rounded-lg bg-slate-50/50 flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-indigo-900">
                          {item.bankName}
                        </span>
                        <Badge className="bg-slate-200 text-slate-700">
                          {item.currency}
                        </Badge>
                      </div>
                      <p className="text-sm font-mono tracking-widest text-slate-600">
                        **** **** **** {item.cardNumber?.slice(-4)}
                      </p>
                      <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>HOLDER: {item.cardHolder}</span>
                        <span>EXP: {item.cardExpire}</span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-8 px-4 text-center">
                  <div className="rounded-full bg-slate-50 p-3 mb-2">
                    <Landmark className="text-slate-300" size={24} />
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    There is no main bank
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Set one of your bank as primary
                  </p>
                </div>
              )}

              <Modal label="Managed Payment Method">
                <Button
                  onClick={() =>
                    router.push(`/admin/profile/${user.id}/paymentmethods`)
                  }
                  className="mt-5"
                  size={"sm"}
                >
                  Add Bank
                </Button>
                {user.payment_methods && user.payment_methods.length > 0 ? (
                  user.payment_methods.map((bank) => (
                    <div
                      key={bank.id}
                      className="p-4 border rounded-lg bg-slate-50/50 flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-5">
                          <span className="font-bold text-indigo-900 capitalize">
                            {bank.bankName}
                          </span>
                          <Badge className="bg-slate-200 text-slate-700">
                            {bank.currency}
                          </Badge>
                        </div>
                        <SwitchPrimary
                          id={bank.id}
                          isPrimary={bank.isDefault}
                          labelName={bank.bankName ?? ""}
                          action={() => setPrimaryBank(bank.id, bank.userId)}
                        />
                      </div>
                      <p className="text-sm font-mono tracking-widest text-slate-600">
                        **** **** **** {bank.cardNumber?.slice(-4)}
                      </p>
                      <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>HOLDER: {bank.cardHolder}</span>
                        <span>EXP: {bank.cardExpire}</span>
                      </div>
                      <DeleteData
                        id={bank.id}
                        label={bank.bankName ?? ""}
                        onDelete={deleteBank}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400 italic col-span-2">
                    No payment methods found.
                  </p>
                )}
              </Modal>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProfileAdmin;
