"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Disclosure } from "@headlessui/react";
import { AiOutlineRight } from "react-icons/ai";
import Card from "../layout/card";
import Button from "../layout/button";
import SubHeading from "../layout/sub-heading";

export default function Products() {
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

  // delete items from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  return (
    <Card>
      <SubHeading>Products</SubHeading>
      <ul className="flex flex-col gap-2 mt-4">
        {!items
          ? "loading"
          : items.map((item, index) => {
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
                      <AiOutlineRight className="ml-auto ui-open:rotate-90 ui-open:transform" />
                    </Disclosure.Button>
                    <Disclosure.Panel className="w-full rounded-md flex flex-col justify-end">
                      <div className="flex flex-col gap-2 border-y p-2 my-2">
                        <span>Ingredients:</span>
                        <ul className="text-xs flex flex-col gap-1 text-slate-700">
                          <li className="flex justify-between" key="">
                            <span>Milk Essence</span>
                            <span className="font-bold">180ml</span>
                          </li>
                        </ul>
                      </div>
                      <div className="flex self-end gap-2">
                        <Button label="Edit" secondary={false} />
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="rounded-md px-5 py-2.5 text-white text-center text-xs bg-slate-500"
                        >
                          Delete
                        </button>
                      </div>
                    </Disclosure.Panel>
                  </Disclosure>
                </li>
              );
            })}
      </ul>
    </Card>
  );
}
