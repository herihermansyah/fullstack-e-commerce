import Link from "next/link";
import {CartBadge} from "../cart/cart-badge";
import SidebarUserInfo from "../profile/user/sidebar-user-info";

export default function MainNavigation() {
  const menuData = [
    {title: "home", href: "/"},
    {title: "shop", href: "/products"},
    {title: "cart", href: "/cartpage", isCart: true},
    {isPorifle: true},
  ];

  return (
    <nav className="bg-blue-600 py-3">
      <ul className="grid grid-cols-4 items-center justify-center place-items-center whitespace-nowrap text-center">
        {menuData.map((item, index) => (
          <li key={index}>
            <Link
              className="uppercase text-lg text-white font-bold"
              href={item.href ?? ""}
            >
              {item.title}
              {item.isCart && <CartBadge />}
              {item.isPorifle && <SidebarUserInfo />}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
