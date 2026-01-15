import React from "react";
import Logo from "./logo";
import QuerySearch from "../query-search";

function Header() {
  return (
    <header className="bg-blue-600 ">
      <div className="flex items-center justify-between gap-5 container mx-auto px-2 md:px-0 py-3">
        <Logo />
        <QuerySearch />
      </div>
    </header>
  );
}

export default Header;
