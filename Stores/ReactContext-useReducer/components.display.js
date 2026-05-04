import React from "react";
import {useStoreState} from "../stores/store.js";

export const Display = ()=>{
  const state = useStoreState();
  console.log("profile")
  return (
    <h2>{state?.name}</h2>
  )
}
