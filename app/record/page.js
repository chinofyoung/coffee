"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import Padded from "../layout/padded";
import MainHeading from "../layout/main-heading";
import SubHeading from "../layout/sub-heading";
import FlexCol from "../layout/flex-col";
import Card from "../layout/card";
import { UserAuth } from "../context/auth-context";

export default function Page() {
  const { user } = UserAuth();
  const [items, setItems] = useState([]);
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({
    product: "",
    quantity: "",
  });

  // add sale to database
  const addSale = async (e) => {
    e.preventDefault();
    if (user && newSale.product !== "" && newSale.quantity !== "") {
      await addDoc(collection(db, "sales"), {
        product: newSale.product,
        quantity: newSale.quantity,
        createdAt: serverTimestamp(),
        uid: user.uid,
      });
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

  // read sales from database
  useEffect(() => {
    const q = query(
      collection(db, "sales"),
      orderBy("createdAt", "desc")
      // limit(5)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let salesArr = [];

      querySnapshot.forEach((doc) => {
        salesArr.push({ ...doc.data(), id: doc.id });
      });
      setSales(salesArr);
    });
  }, []);

  function renderTotal() {
    const salesLength = parseInt(sales.length);
    var totalSales = 0;

    for (let i = 0; i < salesLength; i++) {
      totalSales = parseInt(sales[i]?.quantity) + totalSales;
    }

    return (
      <span className="text-base text-neutral-600 font-bold">
        {totalSales} cups sold
      </span>
    );
  }

  if (!user) {
    return (
      <Padded>
        <FlexCol>
          <MainHeading>Record</MainHeading>
          <SubHeading>Access Denied. Please Login</SubHeading>
        </FlexCol>
      </Padded>
    );
  }

  return (
    <Padded>
      <FlexCol>
        <MainHeading>Record</MainHeading>
        <Card>
          <SubHeading>Sales</SubHeading>
          <div className="mt-2"></div>
          <FlexCol>
            <select
              className="border rounded-md py-2.5 px-4 text-neutral-700"
              onChange={(e) =>
                setNewSale({ ...newSale, product: e.target.value })
              }
            >
              <option value="" disabled>
                Select a product
              </option>
              {!items
                ? "loading"
                : items.map((item, index) => {
                    return (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
            </select>
            <input
              value={newSale.quantity}
              onChange={(e) =>
                setNewSale({ ...newSale, quantity: e.target.value })
              }
              className="text-sm border w-full px-5 py-2.5 rounded-md"
              type="number"
              placeholder="Quantity"
            />
            <button
              onClick={addSale}
              className="rounded-md px-5 py-2.5 text-white text-center text-xs bg-red-500"
            >
              Save
            </button>
          </FlexCol>
        </Card>

        <Card>
          <SubHeading>Total Sales</SubHeading>
          {renderTotal()}
        </Card>

        <Card>
          <SubHeading>Sold Items</SubHeading>
          <ul className="text-xs flex flex-col gap-1 text-slate-700 mt-2">
            {!sales
              ? "loading"
              : sales.map((sale, index) => {
                  return (
                    <li
                      className="flex justify-between items-start gap-2 bg-slate-100 p-2 rounded-md"
                      key={index}
                    >
                      <div className="flex gap-2">
                        <span>{sale.product}</span>
                        <span className="font-bold">x{sale.quantity}</span>
                      </div>
                      <span className="ml-2 font-bold">
                        {new Date(
                          sale?.createdAt?.seconds * 1000
                        ).toLocaleDateString("en-US")}
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
