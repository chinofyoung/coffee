"use client";
import React from "react";
import Padded from "../layout/padded";
import FlexCol from "../layout/flex-col";
import MainHeading from "../layout/main-heading";
import Products from "./products";
import Ingredients from "./ingredients";
import AddIngredient from "./add-ingredient";
import AddProduct from "./add-product";

export default function Page() {
  return (
    <Padded>
      <FlexCol>
        <MainHeading>Products</MainHeading>
        <FlexCol>
          <AddProduct />
          <AddIngredient />
          <Products />
          <Ingredients />
        </FlexCol>
      </FlexCol>
    </Padded>
  );
}
