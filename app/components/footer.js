import Link from "next/link";
import { AiFillHome, AiOutlineDatabase } from "react-icons/ai";
import { BsClipboard2Data, BsFillCartFill } from "react-icons/bs";

export default function Footer() {
  let nav = [
    {
      url: "/",
      label: "Home",
      icon: <AiFillHome />,
    },
    {
      url: "/record",
      label: "Record",
      icon: <AiOutlineDatabase />,
    },
    {
        url: "/products",
        label: "Products",
        icon: <BsFillCartFill />,
      },
    {
      url: "/reports",
      label: "Reports",
      icon: <BsClipboard2Data />,
    },
  ];
  return (
    <div className="fixed bottom-0 bg-slate-900 flex h-16 items-center text-white w-full p-4">
      <ul className="flex text-sm justify-around w-full">
        {nav.map(function (nav, index) {
          return (
            <li key={index} className="">
              <Link
                className="p-4 w-full flex text-xl gap-1 flex-col items-center"
                href={nav.url}
              >
                {nav.icon}
                <span className="text-xs">{nav.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
