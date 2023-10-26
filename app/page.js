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
import { UserAuth } from "./context/auth-context";
import { db } from "./firebase";
import { Disclosure } from "@headlessui/react";
import { AiOutlineRight } from "react-icons/ai";
import Padded from "./layout/padded";
import Card from "./layout/card";
import FlexCol from "./layout/flex-col";
import MainHeading from "./layout/main-heading";
import SubHeading from "./layout/sub-heading";

export default function Home() {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <Padded>
      <MainHeading>Dashboard</MainHeading>
      {loading ? (
        <span>loading</span>
      ) : user ? (
        <span>Access approved</span>
      ) : (
        <span>Access denied</span>
      )}
    </Padded>
  );
}
