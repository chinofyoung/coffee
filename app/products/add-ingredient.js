"use client";
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Disclosure } from "@headlessui/react";
import { AiOutlineRight } from "react-icons/ai";
import Card from "../layout/card";
import FlexCol from "../layout/flex-col";
import SubHeading from "../layout/sub-heading";

export default function AddIngredient() {
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    price: "",
    image: "",
    quantityPack: "",
  });

  // add ingredients to database
  const addIngredient = async (e) => {
    e.preventDefault();
    if (newIngredient.name !== "") {
      await addDoc(collection(db, "ingredients"), {
        name: newIngredient.name.trim(),
        price: newIngredient.price,
        image: newIngredient.image,
        quantityPack: newIngredient.quantityPack,
        createdAt: serverTimestamp(),
      });
      setNewIngredient({ name: "", price: "", image: "", quantityPack: "" });
    }
  };

  return (
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
  );
}
