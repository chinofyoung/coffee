"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDoc,
  QuerySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { AiOutlineRight, AiFillPlusCircle } from "react-icons/ai";
import Padded from "../layout/padded";
import Card from "../layout/card";
import FlexCol from "../layout/flex-col";
import Button from "../layout/button";
import MainHeading from "../layout/main-heading";
import SubHeading from "../layout/sub-heading";

export default function Page() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    image: "",
    url: "",
  });

  const [ingredients, setIngredients] = useState([
    {
      name: "Espresso Concentrate",
      url: "/",
      image: "https://easybrandph.com/wp-content/uploads/2022/03/coffee.png",
      quantity: 20,
    },
    {
      name: "Milk Essence",
      url: "/",
      image:
        "https://easybrandph.com/wp-content/uploads/2022/04/New-Yellow-Foil-Pack-Milk-Essence.png",
      quantity: 180,
    },
    {
      name: "Salted Caramel Syrup",
      url: "/",
      image:
        "https://down-ph.img.susercontent.com/file/d147b7b54102af6c6ae391f442f5d72f",
      quantity: 7,
    },
    {
      name: "Sweetener",
      url: "/",
      image:
        "https://down-ph.img.susercontent.com/file/ph-11134207-7qukz-lh9xwrpu68rqd0",
      quantity: 20,
    },
  ]);

  // add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.image !== "") {
      // setItems([...items, newItem]);
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        image: newItem.image,
      });
      setNewItem({ name: "", image: "" });
    }
  };

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
    <Padded>
      <FlexCol>
        <MainHeading>Products</MainHeading>
        <FlexCol>
          <Card>
            <FlexCol>
              <SubHeading>Add Product</SubHeading>
              <form>
                <FlexCol>
                  <input
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    className="text-sm border w-full px-5 py-2.5 rounded-md"
                    type="text"
                    placeholder="Product Name"
                  />
                  <input
                    value={newItem.image}
                    onChange={(e) =>
                      setNewItem({ ...newItem, image: e.target.value })
                    }
                    className="text-sm border w-full px-5 py-2.5 rounded-md"
                    type="text"
                    placeholder="Product Image"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      className="text-sm border w-full px-5 py-2.5 rounded-md col-span-2"
                      type="text"
                      placeholder="Ingredient"
                    />
                    <input
                      className="text-sm border w-full px-5 py-2.5 rounded-md"
                      type="number"
                      placeholder="Quantity"
                    />
                  </div>
                  <button className="text-xs flex items-center gap-2 self-center">
                    <AiFillPlusCircle className="text-3xl text-slate-600" />
                    <span className="text-slate-600">Add ingredient</span>
                  </button>
                  <button
                    onClick={addItem}
                    className="rounded-md px-5 py-2.5 text-white text-center text-xs bg-red-500"
                  >
                    Save
                  </button>
                </FlexCol>
              </form>
            </FlexCol>
          </Card>

          <Card>
            <SubHeading>Products</SubHeading>
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
                          src={item.image}
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
                            {ingredients.map((ingredient, id) => {
                              return (
                                <li className="flex justify-between" key={id}>
                                  <span>{ingredient.name}</span>
                                  <span className="font-bold">
                                    {ingredient.quantity}ml
                                  </span>
                                </li>
                              );
                            })}
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
        </FlexCol>
      </FlexCol>
    </Padded>
  );
}
