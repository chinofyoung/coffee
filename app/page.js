"use client";
import { Disclosure } from "@headlessui/react";
import { AiOutlineRight } from "react-icons/ai";
import Padded from "./layout/padded";
import Card from "./layout/card";
import FlexCol from "./layout/flex-col";
import MainHeading from "./layout/main-heading";
import SubHeading from "./layout/sub-heading";

export default function Home() {
  let products = [
    {
      name: "Caffe Latte",
      url: "/caffe-latte",
      sales: 29,
      image:
        "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",
    },
    {
      name: "Salted Caramel",
      url: "/salted-caramel",
      sales: 54,
      image:
        "https://www.starbucksathome.com/ca/sites/default/files/styles/recipe_ingredient/public/2021-03/Salted%20Caramel%20Coffee%20Chiller_0.jpg?itok=P9I2wFGu",
    },
    {
      name: "Coffee Matcha",
      url: "/coffee-matcha",
      sales: 21,
      image:
        "https://www.siftandsimmer.com/wp-content/uploads/2021/03/matcha-espresso-fusion1.jpg",
    },
  ];
  return (
    <Padded>
      <FlexCol>
        <MainHeading>Dashbaord</MainHeading>
        <Card>
          <SubHeading>Sales</SubHeading>
          <ul className="flex flex-col gap-2 mt-4">
            {products.map(function (product, index) {
              return (
                <li
                  key={index}
                  className="flex flex-col items-start gap-2 p-2 rounded-md"
                >
                  <Disclosure>
                    <Disclosure.Button className="flex items-center justify-start gap-2 w-full">
                      <img
                        className="rounded-md w-12 h-12 object-cover"
                        src={product.image}
                      />
                      <span className="p-2 inline text-sm text-slate-700 font-bold">
                        {product.name}
                      </span>

                      <span className="font-bold text-sm text-slate-600">
                        x{product.sales}
                      </span>
                      <AiOutlineRight className="ml-auto ui-open:rotate-90 ui-open:transform" />
                    </Disclosure.Button>
                    <Disclosure.Panel className="w-full rounded-md flex justify-end">
                      <button className="py-1 px-5 text-sm text-white rounded-md bg-red-400">
                        Edit
                      </button>
                    </Disclosure.Panel>
                  </Disclosure>
                </li>
              );
            })}
          </ul>
        </Card>
      </FlexCol>
    </Padded>
  );
}
