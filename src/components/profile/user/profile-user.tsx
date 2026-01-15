"use client";

import React from "react";
import {
  CalendarDays,
  Mail,
  User,
  MapPin,
  CreditCard,
  MapPinOff,
  Landmark,
  Phone,
  Settings,
} from "lucide-react";
import {format} from "date-fns";
import {Prisma} from "@/generated/prisma/client";
import {useRouter} from "next/navigation";
import {
  deleteAddress,
  deleteBank,
  setPrimaryAddress,
  setPrimaryBank,
} from "@/feature/user/action";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ChangeAvatar} from "../change-avatar";
import {Badge} from "@/components/ui/badge";
import ChangePassword from "../change-password";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ChangeGender} from "../change-gender";
import {Modal} from "@/components/modal";
import SwitchPrimary from "../switch-primary-bank";
import {DeleteData} from "../delete-data";
import Link from "next/link";

type UserTypeProps = Prisma.UserGetPayload<{
  include: {
    addresses: true;
    payment_methods: true;
  };
}>;

interface ProfileAdminProps {
  user: UserTypeProps;
}

function ProfileUser({user}: ProfileAdminProps) {
  const formatDate = (date: Date | null | undefined) =>
    date ? format(new Date(date), "dd MMM yyyy") : "-";

  const router = useRouter();

  return (
    <div className="mt-5">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 to-violet-700 p-6 sm:p-10 text-white shadow-xl">
        {/* Decorator Ornaments */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6">
          <div className="relative group">
            <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-white/20 shadow-2xl transition-transform duration-300 group-hover:scale-105">
              <AvatarImage src={user.image || ""} className="object-cover" />
              <AvatarFallback className="text-4xl bg-white text-indigo-600 font-black">
                {user.name?.substring(0, 2).toUpperCase() || "CN"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 text-black -right-2 rounded-full p-1 shadow-lg">
              <ChangeAvatar id={user.id} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                {user.firstName} {user.lastName}
              </h1>
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md px-4 py-1">
                {user.role}
              </Badge>
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md px-4 py-1">
                {user.role === "ADMIN" ? (
                  <>
                    <Link href={"/admin"}>Admin Page</Link>
                  </>
                ) : null}
              </Badge>
              {!user.isActive && (
                <Badge variant="destructive" className="animate-pulse">
                  BANNED
                </Badge>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4     text-sm">
              <span className="flex items-center gap-2">
                <Mail size={16} /> {user.email}
              </span>
              <span className="hidden sm:block text-white/30">|</span>
              <span className="flex items-center gap-2">
                <CalendarDays size={16} /> Joined {formatDate(user.createdAt)}
              </span>
            </div>

            <div className="pt-2 text-black flex flex-wrap justify-center md:justify-start gap-3">
              <ChangePassword id={user.id} />
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full font-bold"
                onClick={() =>
                  router.push(`/profile/${user.id}/editinformation`)
                }
              >
                <Settings className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Personal Info */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="border-none shadow-2xl shadow-indigo-100/50 rounded-3xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-lg font-bold flex items-center gap-3 text-slate-800">
                <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
                  <User size={20} />
                </div>
                Bio Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <InfoItem
                label="Full Name"
                value={`${user.firstName} ${user.lastName}`}
              />
              <div className="flex items-center justify-between group">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Gender
                  </p>
                  <p className="font-semibold text-slate-700 capitalize">
                    {user.gender || "Not Set"}
                  </p>
                </div>
                <ChangeGender gender={user.gender ?? ""} id={user.id} />
              </div>
              <InfoItem label="Birth Date" value={formatDate(user.birthDate)} />
              <InfoItem
                label="Phone"
                value={user.phone || "-"}
                icon={<Phone size={14} />}
              />
              <InfoItem label="Maiden Name" value={user.maidenName || "-"} />
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Address & Payment */}
        <div className="lg:col-span-2 space-y-8">
          {/* ADDRESS SECTION */}
          <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 p-6">
              <CardTitle className="text-lg font-bold flex items-center gap-3">
                <div className="p-2 bg-rose-100 rounded-xl text-rose-600">
                  <MapPin size={20} />
                </div>
                Saved Addresses
              </CardTitle>
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
            </CardHeader>
            <CardContent className="p-6">
              {user.addresses.filter((a) => a.isPrimary).length > 0 ? (
                user.addresses
                  .filter((a) => a.isPrimary)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl bg-linear-to-r from-slate-50 to-white border border-slate-100"
                    >
                      <div className="h-12 w-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900">
                            {item.label || "Main Address"}
                          </span>
                          <Badge className="bg-green-500 text-[10px] h-4">
                            PRIMARY
                          </Badge>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {item.fullAddress}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">
                          {item.city}, {item.province}, {item.country}
                        </p>
                      </div>
                    </div>
                  ))
              ) : (
                <EmptyState
                  icon={<MapPinOff size={40} />}
                  text="No primary address set"
                  subtext="Add an address and set it as your main shipping point."
                />
              )}
            </CardContent>
          </Card>

          {/* PAYMENT SECTION */}
          <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 p-6">
              <CardTitle className="text-lg font-bold flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
                  <CreditCard size={20} />
                </div>
                Banking & Payments
              </CardTitle>

              <Modal label="Managed Payment Method">
                <Button
                  onClick={() =>
                    router.push(`/profile/${user.id}/paymentmethods`)
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
            </CardHeader>
            <CardContent className="p-6">
              {user.payment_methods.filter((p) => p.isDefault).length > 0 ? (
                user.payment_methods
                  .filter((p) => p.isDefault)
                  .map((bank) => (
                    <div
                      key={bank.id}
                      className="relative group overflow-hidden p-6 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Landmark size={80} />
                      </div>
                      <div className="relative z-10 space-y-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                              Primary Bank
                            </p>
                            <h4 className="text-xl font-black italic">
                              {bank.bankName}
                            </h4>
                          </div>
                          <Badge className="bg-emerald-500">
                            {bank.currency}
                          </Badge>
                        </div>
                        <p className="text-xl sm:text-2xl font-mono tracking-[0.2em]">
                          **** **** **** {bank.cardNumber?.slice(-4)}
                        </p>
                        <div className="flex justify-between items-end">
                          <div className="text-xs space-y-1">
                            <p className="text-slate-400 uppercase">
                              Card Holder
                            </p>
                            <p className="font-bold">{bank.cardHolder}</p>
                          </div>
                          <div className="text-xs text-right space-y-1">
                            <p className="text-slate-400 uppercase">Expires</p>
                            <p className="font-bold">{bank.cardExpire}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <EmptyState
                  icon={<Landmark size={40} />}
                  text="No bank account linked"
                  subtext="Connect your bank for faster transactions."
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Reusable Small Components for Cleaner Code
function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="group space-y-1">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
        {label}
      </p>
      <p className="font-semibold text-slate-700 flex items-center gap-2">
        {icon && <span className="text-slate-400">{icon}</span>}
        {value}
      </p>
    </div>
  );
}

function EmptyState({
  icon,
  text,
  subtext,
}: {
  icon: React.ReactNode;
  text: string;
  subtext: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30">
      <div className="text-slate-200 mb-4">{icon}</div>
      <p className="font-bold text-slate-600">{text}</p>
      <p className="text-sm text-slate-400 max-w-50">{subtext}</p>
    </div>
  );
}

export default ProfileUser;
