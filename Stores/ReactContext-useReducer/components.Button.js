import React from "react";
import { useStoreDispatch } from "../stores/store.js";



export const UpdateProfile = ()=> {
  const dispatch = useStoreDispatch();
  console.log("action button")
  return (
    <button onClick={()=> dispatch({type:"UPDATE",payload:"Animesh"})}>Update</button>
  )
}
