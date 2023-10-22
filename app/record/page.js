"use client";
import React, { useState, useEffect } from "react";
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
import { db } from "../firebase";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { AiOutlineRight } from "react-icons/ai";
import Padded from "../layout/padded";
import Card from "../layout/card";
import FlexCol from "../layout/flex-col";
import MainHeading from "../layout/main-heading";
import SubHeading from "../layout/sub-heading";

export default function Page() {
  const [items, setItems] = useState([]);

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

  let materials = [
    {
      name: "Espresso Concentrate",
      url: "/",
      image: "https://easybrandph.com/wp-content/uploads/2022/03/coffee.png",
    },
    {
      name: "Milk Essence",
      url: "/",
      image:
        "https://easybrandph.com/wp-content/uploads/2022/04/New-Yellow-Foil-Pack-Milk-Essence.png",
    },
    {
      name: "Salted Caramel Syrup",
      url: "/",
      image:
        "https://down-ph.img.susercontent.com/file/d147b7b54102af6c6ae391f442f5d72f",
    },
    {
      name: "Sweetener",
      url: "/",
      image:
        "https://down-ph.img.susercontent.com/file/ph-11134207-7qukz-lh9xwrpu68rqd0",
    },
    {
      name: "Plastic Cup",
      url: "/",
      image: "https://m.media-amazon.com/images/I/61bvxPzxfnL.jpg",
    },
  ];

  return (
    <>
      <Card>
        <SubHeading>Opening Inventory</SubHeading>
        <ul className="grid grid-cols-3 gap-2 mt-4">
          {materials.map(function (material, index) {
            return (
              <li
                key={index}
                className="flex flex-col justify-center items-center gap-2"
              >
                <img
                  className="rounded-md w-12 h-12 object-cover"
                  src={material.image}
                />
                <Link
                  className="p-2 w-full block text-center text-xs text-slate-700 font-bold"
                  href={material.url}
                >
                  {material.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </Card>
      <Card>
        <SubHeading>Sales</SubHeading>
        <ul className="flex flex-col gap-2 mt-4">
          {items.map((item, index) => {
            return (
              <li
                key={index}
                className="flex flex-col items-start gap-2 bg-slate-100 p-2 rounded-md"
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

                    {item.sales && (
                      <span className="font-bold text-sm text-slate-600">
                        x{item.sales}
                      </span>
                    )}
                    <AiOutlineRight className="ml-auto ui-open:rotate-90 ui-open:transform" />
                  </Disclosure.Button>
                  <Disclosure.Panel className="w-full rounded-md flex justify-end">
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        className="text-sm border w-full px-5 py-2.5 rounded-md col-span-2"
                        type="text"
                        placeholder="Sales"
                      />
                      <button className="py-1 px-5 text-sm text-white rounded-md bg-red-400">
                        Save
                      </button>
                    </div>
                  </Disclosure.Panel>
                </Disclosure>
              </li>
            );
          })}
        </ul>
      </Card>
      <Card>
        <SubHeading>Leftover</SubHeading>
        <ul className="grid grid-cols-3 gap-2 mt-4">
          {materials.map(function (material, index) {
            return (
              <li
                key={index}
                className="flex flex-col justify-center items-center gap-2"
              >
                <img
                  className="rounded-md w-12 h-12 object-cover"
                  src={material.image}
                />
                <Link
                  className="p-2 w-full block text-center text-xs text-slate-700 font-bold"
                  href={material.url}
                >
                  {material.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </Card>
    </>
  );
}
