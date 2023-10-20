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

  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    price: "",
    image: "",
    quantityPack: "",
  });

  // add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== "") {
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

  // add ingredients to database
  const addIngredient = async (e) => {
    e.preventDefault();
    if (newIngredient.name !== "") {
      await addDoc(collection(db, "ingredients"), {
        name: newIngredient.name.trim(),
        price: newIngredient.price,
        image: newIngredient.image,
        quantityPack: newIngredient.quantityPack,
      });
      setNewIngredient({ name: "", price: "", image: "", quantityPack: "" });
    }
  };

  // delete items from database
  const deleteIngredient = async (id) => {
    await deleteDoc(doc(db, "ingredients", id));
  };

  // read ingredients from database
  useEffect(() => {
    const q = query(collection(db, "ingredients"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let ingredientsArr = [];

      querySnapshot.forEach((doc) => {
        ingredientsArr.push({ ...doc.data(), id: doc.id });
      });
      setIngredients(ingredientsArr);
    });
  }, []);

  return (
    <Padded>
      <FlexCol>
        <MainHeading>Products</MainHeading>
        <FlexCol>
          <Card>
            <Disclosure>
              <FlexCol>
                <Disclosure.Button className="flex justify-between items-center">
                  <SubHeading>Add Product</SubHeading>
                  <AiOutlineRight className="ml-auto ui-open:rotate-90 ui-open:transform" />
                </Disclosure.Button>
                <Disclosure.Panel>
                  <form>
                    <FlexCol>
                      <input
                        value={newItem.name}
                        onChange={(e) =>
                          setNewItem({ ...newItem, name: e.target.value })
                        }
                        className="text-sm border w-full px-5 py-2.5 rounded-md"
                        type="text"
                        placeholder="Name"
                      />
                      <input
                        value={newItem.image}
                        onChange={(e) =>
                          setNewItem({ ...newItem, image: e.target.value })
                        }
                        className="text-sm border w-full px-5 py-2.5 rounded-md"
                        type="text"
                        placeholder="Image"
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
                </Disclosure.Panel>
              </FlexCol>
            </Disclosure>
          </Card>

          <Card>
            <Disclosure>
              <FlexCol>
                <Disclosure.Button className="flex justify-between items-center">
                  <SubHeading>Add Ingredient</SubHeading>
                  <AiOutlineRight className="ml-auto ui-open:rotate-90 ui-open:transform" />
                </Disclosure.Button>
                <Disclosure.Panel>
                  <form>
                    <FlexCol>
                      <input
                        value={newIngredient.name}
                        onChange={(e) =>
                          setNewIngredient({
                            ...newIngredient,
                            name: e.target.value,
                          })
                        }
                        className="text-sm border w-full px-5 py-2.5 rounded-md"
                        type="text"
                        placeholder="Name"
                      />
                      <input
                        value={newIngredient.price}
                        onChange={(e) =>
                          setNewIngredient({
                            ...newIngredient,
                            price: e.target.value,
                          })
                        }
                        className="text-sm border w-full px-5 py-2.5 rounded-md"
                        type="number"
                        placeholder="Price"
                      />
                      <input
                        value={newIngredient.image}
                        onChange={(e) =>
                          setNewIngredient({
                            ...newIngredient,
                            image: e.target.value,
                          })
                        }
                        className="text-sm border w-full px-5 py-2.5 rounded-md"
                        type="text"
                        placeholder="Image"
                      />
                      <input
                        value={newIngredient.quantityPack}
                        onChange={(e) =>
                          setNewIngredient({
                            ...newIngredient,
                            quantityPack: e.target.value,
                          })
                        }
                        className="text-sm border w-full px-5 py-2.5 rounded-md"
                        type="number"
                        placeholder="Quantity per pack"
                      />
                      <button
                        onClick={addIngredient}
                        className="rounded-md px-5 py-2.5 text-white text-center text-xs bg-red-500"
                      >
                        Save
                      </button>
                    </FlexCol>
                  </form>
                </Disclosure.Panel>
              </FlexCol>
            </Disclosure>
          </Card>

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
                                item.image
                                  ? item.image
                                  : "https://placehold.co/48x48"
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
                                {ingredients.map((ingredient, id) => {
                                  return (
                                    <li
                                      className="flex justify-between"
                                      key={id}
                                    >
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
        </FlexCol>
      </FlexCol>
    </Padded>
  );
}
