"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { Disclosure } from "@headlessui/react";
import { AiOutlineRight } from "react-icons/ai";
import Card from "../layout/card";
import Button from "../layout/button";
import SubHeading from "../layout/sub-heading";

export default function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  // read ingredients from database
  useEffect(() => {
    const q = query(collection(db, "ingredients"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let ingredientsArr = [];

      querySnapshot.forEach((doc) => {
        ingredientsArr.push({ ...doc.data(), id: doc.id });
      });
      setIngredients(ingredientsArr);
    });
  }, []);

  // delete items from database
  const deleteIngredient = async (id) => {
    await deleteDoc(doc(db, "ingredients", id));
  };

  return (
    <Card>
      <SubHeading>Ingredients</SubHeading>
      <ul className="flex flex-col gap-2 mt-4">
        {!ingredients
          ? "loading"
          : ingredients.map((ingredient, index) => {
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
                          ingredient.image
                            ? ingredient.image
                            : "https://placehold.co/48x48"
                        }
                      />
                      <span className="p-2 inline text-sm text-slate-700 font-bold">
                        {ingredient.name}
                      </span>
                      <AiOutlineRight className="ml-auto ui-open:rotate-90 ui-open:transform" />
                    </Disclosure.Button>
                    <Disclosure.Panel className="w-full rounded-md flex flex-col justify-end">
                      <div className="flex flex-col">
                        <ul className="text-xs flex flex-col gap-2 p-2">
                          <li>
                            Quantity per pack:
                            <span className="ml-2 font-bold">
                              {parseInt(ingredient.quantityPack, 10)}ml
                            </span>
                          </li>
                          <li>
                            Price per pack:
                            <span className="ml-2 font-bold">
                              ₱{parseInt(ingredient.price, 10)}
                            </span>
                          </li>
                          {/* <li>
                            Date Created:
                            <span className="ml-2 font-bold">
                              {new Date(
                                ingredient.createdAt.seconds * 1000
                              ).toLocaleDateString("en-US")}
                            </span>
                          </li> */}
                        </ul>
                      </div>
                      <div className="flex self-end gap-2">
                        <Button label="Edit" secondary={false} />
                        <button
                          onClick={() => deleteIngredient(ingredient.id)}
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
