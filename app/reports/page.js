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

export default function Page() {
  const [items, setItems] = useState([]);
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({
    product: "",
    quantity: "",
  });

  // add sale to database
  const addSale = async (e) => {
    e.preventDefault();
    if (newSale.quantity !== "") {
      await addDoc(collection(db, "sales"), {
        product: newSale.product,
        quantity: newSale.quantity,
        createdAt: serverTimestamp(),
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

  // const result = parseInt(sales.quantity).reduce(
  //   (total, currentValue) => (total = total + currentValue.prix),
  //   0
  // );

  // {
  //   console.log(sales.length);
  // }

  function renderTotal() {
    const salesLength = parseInt(sales.length);
    var totalSales = 0;

    for (let i = 0; i < salesLength; i++) {
      totalSales = parseInt(sales[i]?.quantity) + totalSales;
    }

    return (
      <span className="text-base text-neutral-600 font-bold">
        {totalSales} cups
      </span>
    );
  }

  return (
    <Padded>
      <FlexCol>
        <MainHeading>Reports</MainHeading>
        <Card>
          <SubHeading>Summary</SubHeading>
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
                          sale.createdAt.seconds * 1000
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
