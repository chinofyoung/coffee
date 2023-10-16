"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import { Disclosure } from "@headlessui/react";
import { AiOutlineRight } from "react-icons/ai";
import Padded from "./layout/padded";
import Card from "./layout/card";
import FlexCol from "./layout/flex-col";
import MainHeading from "./layout/main-heading";
import SubHeading from "./layout/sub-heading";

export default function Home() {
  const [items, setItems] = useState([]);

  const [ingredients, setIngredients] = useState([
    {
      name: "Espresso Concentrate",
      url: "/",
      image: "https://easybrandph.com/wp-content/uploads/2022/03/coffee.png",
      quantity: 1540,
    },
    {
      name: "Milk Essence",
      url: "/",
      image:
        "https://easybrandph.com/wp-content/uploads/2022/04/New-Yellow-Foil-Pack-Milk-Essence.png",
      quantity: 2130,
    },
    {
      name: "Salted Caramel Syrup",
      url: "/",
      image:
        "https://down-ph.img.susercontent.com/file/d147b7b54102af6c6ae391f442f5d72f",
      quantity: 890,
    },
    {
      name: "Sweetener",
      url: "/",
      image:
        "https://down-ph.img.susercontent.com/file/ph-11134207-7qukz-lh9xwrpu68rqd0",
      quantity: 870,
    },
  ]);

  // read items from database
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
    });
  }, []);

  return (
    <Padded>
      <FlexCol>
        <MainHeading>Dashbaord</MainHeading>
        <Card>
          <SubHeading>Sales</SubHeading>
          <ul className="flex flex-col gap-2 mt-4">
            {items.map(function (item, id) {
              return (
                <li
                  key={id}
                  className="flex flex-col items-start gap-2 p-2 rounded-md"
                >
                  <Disclosure>
                    <Disclosure.Button className="flex items-center justify-start gap-2 w-full">
                      <img
                        className="rounded-md w-12 h-12 object-cover"
                        src={
                          item.image ? item.image : "https://placehold.co/48x48"
                        }
                      />
                      <span className="p-2 inline text-sm text-slate-700 font-bold">
                        {item.name}
                      </span>

                      <span className="font-bold text-sm text-slate-600">
                        {/* x{item.sales} */}
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

        <Card>
          <SubHeading>Remaining Ingredients</SubHeading>
          <ul className="flex flex-col gap-2 mt-4">
            {ingredients.map(function (ingredient, id) {
              return (
                <li className="flex justify-between items-center" key={id}>
                  <img
                    className="rounded-md w-12 h-12 object-cover"
                    src={
                      ingredient.image
                        ? ingredient.image
                        : "https://placehold.co/48x48"
                    }
                  />
                  <Link
                    className="p-2 w-full block text-xs text-slate-700 font-bold"
                    href={ingredient.url}
                  >
                    {ingredient.name}
                  </Link>
                  <span className="text-xs font-bold text-slate-600">
                    {ingredient.quantity}ml
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>
      </FlexCol>
    </Padded>
  );
}
