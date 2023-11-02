import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

export default function SalesRow({ sale }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    onSnapshot(doc(db, "users", sale.uid), (snapshot) => {
      setUser(snapshot.data() || {});
    });
  }, [user.uid]);
  return (
    <li className="flex justify-between items-start gap-2 bg-slate-100 p-2 rounded-md">
      <small>{user.displayName}</small>
      <div className="flex gap-2">
        <span>{sale.product}</span>
        <span className="font-bold">x{sale.quantity}</span>
      </div>
      <span className="ml-2 font-bold">
        {new Date(sale?.createdAt?.seconds * 1000).toLocaleDateString("en-US")}
      </span>
    </li>
  );
}
