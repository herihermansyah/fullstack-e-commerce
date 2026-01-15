import React from "react";
import {Loader2} from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-16 w-16 animate-ping rounded-full border-2 border-primary/20"></div>

        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>

      <div className="mt-4 flex flex-col items-center gap-1">
        <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground animate-pulse">
          Loading
        </p>
        <div className="h-1 w-24 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-full origin-left animate-progress bg-primary"></div>
        </div>
      </div>
    </div>
  );
}
