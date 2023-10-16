import React from "react";

export default function Button(props) {
  return (
    <button
      className={`rounded-md px-5 py-2.5 text-white text-center text-xs ${
        props.secondary ? "bg-slate-400" : "bg-red-500 "
      }`}
    >
      {props.label}
    </button>
  );
}
