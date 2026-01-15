import Image from "next/image";
import React from "react";

function ErrorUi() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/not-found-error.svg"
        alt="not found error"
        width={"200"}
        loading="eager"
        height={200}
        className="w-200 h-200"
      />
    </div>
  );
}

export default ErrorUi;
