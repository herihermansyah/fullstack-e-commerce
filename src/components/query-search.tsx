"use client";

import React, {useTransition} from "react";
import {Input} from "./ui/input";
import {useRouter, useSearchParams} from "next/navigation";
import {Search, Loader2} from "lucide-react";
import {useDebouncedCallback} from "use-debounce";

function QuerySearch() {
  const searchParams = useSearchParams();
  const {replace} = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    startTransition(() => {
      replace(`/products?${params.toString()}`);
    });
  }, 1000);

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
        ) : (
          <Search className="h-4 w-4" />
        )}
      </div>
      <Input
        placeholder="Find your favorite products..."
        className="pl-10 rounded-full border-slate-200 bg-white"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}

export default QuerySearch;
